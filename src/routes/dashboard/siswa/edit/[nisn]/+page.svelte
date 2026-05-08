<script lang="ts">
    import { enhance } from '$app/forms';
    let { data } = $props();
    let student = $derived(data.student);
</script>

<style>
    .edit-body { font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; }
    label { display: block; margin-top: 15px; font-weight: bold; }
    input, select { width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    button { margin-top: 20px; background-color: #28a745; color: #fff; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer; width: 100%; font-weight: bold; }
    button:hover { background-color: #218838; }
    .back-link { display: block; text-align: center; margin-top: 20px; color: #007bff; text-decoration: none; }
</style>

<div class="edit-body">
    <h2>Edit Data Siswa</h2>
    <form method="POST" use:enhance>
        <label for="nama">Nama Lengkap</label>
        <input type="text" name="nama" id="nama" value={student.nama} required>

        <label for="nis">NIS</label>
        <input type="text" name="nis" id="nis" value={student.nis} required>

        <label for="kelas">Kelas</label>
        <input type="text" name="kelas" id="kelas" value={student.kelas} required>

        <label for="jk">Jenis Kelamin</label>
        <select name="jk" id="jk" value={student.jenis_kelamin} required>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
        </select>

        <label for="tempat">Tempat Lahir</label>
        <input type="text" name="tempat" id="tempat" value={student.tempat_lahir}>

        <label for="tgl">Tanggal Lahir</label>
        <input type="date" name="tgl" id="tgl" value={student.tanggal_lahir}>

        <button type="submit">Simpan Perubahan</button>
    </form>
    <a href="/dashboard/siswa" class="back-link">← Kembali ke Daftar Siswa</a>
</div>
