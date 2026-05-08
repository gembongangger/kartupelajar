<script lang="ts">
    import { enhance } from '$app/forms';
    let { data } = $props();
</script>

<style>
    .list-body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
    th { background: #eee; }

    .button {
        display: inline-block;
        background: #007bff;
        color: #fff;
        padding: 5px 10px;
        text-decoration: none;
        border-radius: 3px;
        border: none;
        cursor: pointer;
        font-size: 0.9rem;
    }
    .button:hover { background: #0056b3; }

    .button-edit {
        background: #28a745;
    }
    .button-edit:hover { background: #1e7e34; }

    .button-delete {
        background: #dc3545;
    }
    .button-delete:hover { background: #b02a37; }

    .back-link {
        display: inline-block;
        margin-top: 20px;
        color: #007bff;
        text-decoration: none;
    }
</style>

<div class="list-body">
    <h2>Daftar Siswa</h2>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>NIS</th>
                <th>NISN</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Jenis Kelamin</th>
                <th>Tgl Lahir</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            {#each data.students as row, i}
                <tr>
                    <td>{i + 1}</td>
                    <td>{row.nis}</td>
                    <td>{row.nisn}</td>
                    <td>{row.nama}</td>
                    <td>{row.kelas}</td>
                    <td>{row.jenis_kelamin}</td>
                    <td>{row.tanggal_lahir}</td>
                    <td>
                        <a class="button button-edit" href="/dashboard/siswa/edit/{row.nisn}">Edit</a>
                        <a class="button" href="/dashboard/cetak?nisn={row.nisn}" target="_blank">Cetak Kartu</a>
                        <form method="POST" action="?/delete" style="display:inline" use:enhance={() => {
                            return async ({ result }) => {
                                if (confirm('Yakin ingin menghapus siswa ini?')) {
                                    // Let sveltekit handle the result
                                } else {
                                    // Cancel deletion
                                    return;
                                }
                            };
                        }}>
                            <input type="hidden" name="nisn" value={row.nisn}>
                            <button type="submit" class="button button-delete">Hapus</button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <a href="/dashboard" class="back-link">← Kembali ke Dashboard</a>
</div>
