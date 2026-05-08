<script lang="ts">
    import { enhance } from '$app/forms';
    let { data } = $props();
    const { siswa } = data;
</script>

<style>
    .siswa-body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f9f9f9;
        color: #000000;
        padding: 20px;
        margin: 0;
        min-height: 100vh;
    }

    h2, h3 {
        color: #003366;
        margin-bottom: 10px;
    }

    form {
        margin-bottom: 30px;
        max-width: 500px;
    }

    label {
        display: block;
        margin-top: 15px;
        font-weight: bold;
    }

    input[type="text"],
    input[type="date"],
    select,
    input[type="file"] {
        padding: 10px;
        width: 100%;
        max-width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        margin-top: 20px;
        background-color: #1877f2;
        color: #fff;
        border: none;
        padding: 10px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #145dbf;
    }

    img {
        margin-top: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        max-width: 150px;
        height: auto;
        display: block;
    }

    .logout-link {
        color: #1877f2;
        text-decoration: none;
        display: inline-block;
        margin-top: 20px;
    }

    .logout-link:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 600px) {
        .siswa-body {
            padding: 15px;
        }
        button {
            width: 100%;
        }
    }
</style>

<div class="siswa-body">
    <h2>Profil Siswa</h2>

    <form method="POST" action="?/update" use:enhance>
        <label>Nama Lengkap</label>
        <input type="text" name="nama" value={siswa.nama} required>

        <label>Jenis Kelamin</label>
        <select name="jk" value={siswa.jenis_kelamin} required>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
        </select>

        <label>Tempat Lahir</label>
        <input type="text" name="tempat" value={siswa.tempat_lahir}>

        <label>Tanggal Lahir</label>
        <input type="date" name="tgl" value={siswa.tanggal_lahir}>

        <label>Kelas</label>
        <input type="text" name="kelas" value={siswa.kelas} required>

        <button type="submit">Simpan Perubahan</button>
    </form>

    <h3>Foto Siswa</h3>
    {#if siswa.nisn}
        <img src="/foto/{siswa.nisn}.jpg?t={Date.now()}" alt="Foto Siswa" on:error={(e) => e.currentTarget.style.display = 'none'}>
    {/if}

    <form method="POST" action="?/upload_foto" enctype="multipart/form-data" use:enhance>
        <label>Ganti Foto (JPG)</label>
        <input type="file" name="foto" accept=".jpg" required>
        <button type="submit">Upload Foto</button>
    </form>

    <form method="POST" action="/logout">
        <button type="submit" class="logout-link" style="background: none; color: #1877f2; padding: 0; font-size: inherit; cursor: pointer;">Logout</button>
    </form>
</div>
