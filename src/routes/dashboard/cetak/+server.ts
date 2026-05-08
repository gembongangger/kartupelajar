import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/db';
import { jsPDF } from 'jspdf';
import bwipjs from 'bwip-js';
import { getDefaultPhotoBuffer, imageFormatFromBuffer, photoValueToBuffer } from '$lib/server/photo';

function tanggalIndonesia(tanggal: string) {
    if (!tanggal || tanggal === '0000-00-00') return '-';
    const bulan = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const d = new Date(tanggal);
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

async function generateBarcode(text: string): Promise<Buffer> {
    return bwipjs.toBuffer({
        bcid: 'code128',
        text: text,
        scale: 3,
        height: 10,
        includetext: false,
    });
}

export const GET: RequestHandler = async ({ url, locals }) => {
    if (!locals.user || locals.user.role !== 'admin') {
        throw error(401, 'Unauthorized');
    }

    const nisn = url.searchParams.get('nisn');
    const kelas = url.searchParams.get('kelas');

    let sql = 'SELECT * FROM siswa';
    let args: any[] = [];

    if (nisn) {
        sql += ' WHERE nisn = ?';
        args.push(nisn);
    } else if (kelas) {
        sql += ' WHERE kelas = ?';
        args.push(kelas);
    }

    const studentsResult = await db.execute({ sql, args });
    const students = studentsResult.rows;
    
    const settingsResult = await db.execute('SELECT * FROM pengaturan LIMIT 1');
    const pengaturan = settingsResult.rows[0];

    if (students.length === 0) {
        throw error(404, 'No students found');
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    
    for (let i = 0; i < students.length; i++) {
        const student = students[i] as any;
        if (i > 0 && i % 4 === 0) {
            doc.addPage();
        }

        const row = i % 4;
        const x = 10;
        const y = 10 + (row * 60);

        // Front Card
        doc.rect(x, y, 86, 54);
        
        // Background Depan
        const bgBuffer = photoValueToBuffer(pengaturan.background);
        if (bgBuffer) {
            const bgFormat = imageFormatFromBuffer(bgBuffer);
            if (bgFormat) {
                doc.addImage(bgBuffer.toString('base64'), bgFormat, x, y, 86, 54);
            }
        }

        // Foto Siswa
        const fotoBuffer = photoValueToBuffer(student.foto) || getDefaultPhotoBuffer();
        if (fotoBuffer) {
            const fotoData = fotoBuffer.toString('base64');
            doc.addImage(fotoData, 'JPEG', x + 4, y + 12, 18, 22);
        }

        // Data Siswa
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(`NAMA : ${student.nama}`, x + 25, y + 16);
        
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text(`NISN : ${student.nisn}`, x + 25, y + 20);
        doc.text(`TTL : ${student.tempat_lahir}, ${student.tanggal_lahir}`, x + 25, y + 24);
        doc.text(`JK : ${student.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}`, x + 25, y + 28);

        // Barcode
        const barcodeBuffer = await generateBarcode(student.nisn as string);
        const barcodeBase64 = barcodeBuffer.toString('base64');
        doc.addImage(barcodeBase64, 'PNG', x + 13, y + 38, 60, 8);
        doc.text(student.nisn as string, x + 43, y + 49, { align: 'center' });

        // Back Card
        const xBack = x + 90;
        doc.rect(xBack, y, 86, 54);
        
        const bgBackBuffer = photoValueToBuffer(pengaturan.background_belakang);
        if (bgBackBuffer) {
            const bgBackFormat = imageFormatFromBuffer(bgBackBuffer);
            if (bgBackFormat) {
                doc.addImage(bgBackBuffer.toString('base64'), bgBackFormat, xBack, y, 86, 54);
            }
        }

        doc.setFontSize(7);
        const tataTertib = `TATA TERTIB / KETERANGAN:\n1. Kartu ini wajib dibawa setiap hari sekolah.\n2. Jika menemukan kartu ini, mohon dikembalikan ke:\n${pengaturan.nama_sekolah}\n${pengaturan.alamat}`;
        doc.text(tataTertib, xBack + 5, y + 10, { maxWidth: 76 });

        // TTD
        doc.text(`Ditetapkan di: ......, ${tanggalIndonesia(pengaturan.tanggal_ttd as string)}`, xBack + 62, y + 36, { align: 'center' });
        doc.text('Kepala Sekolah,', xBack + 62, y + 40, { align: 'center' });

        const ttdBuffer = photoValueToBuffer(pengaturan.tanda_tangan);
        if (ttdBuffer) {
            const ttdFormat = imageFormatFromBuffer(ttdBuffer);
            if (ttdFormat) {
                doc.addImage(ttdBuffer.toString('base64'), ttdFormat, xBack + 52, y + 42, 20, 8);
            }
        }

        doc.setFont('helvetica', 'bold');
        doc.text(pengaturan.kepala_sekolah as string, xBack + 62, y + 51, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.text(`NIP. ${pengaturan.nip_kepala_sekolah}`, xBack + 62, y + 54, { align: 'center' });
    }

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    return new Response(pdfBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="Kartu_Pelajar.pdf"'
        }
    });
};
