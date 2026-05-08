<script lang="ts">
    import { enhance } from '$app/forms';
    let { data, form } = $props();
    const { pengaturan } = data;

    let logoPreview = $state(pengaturan.logo ? `/assets/logo/${pengaturan.logo}` : '');
    let ttdPreview = $state(pengaturan.tanda_tangan ? `/assets/tanda_tangan/${pengaturan.tanda_tangan}` : '');
    let bgPreview = $state(pengaturan.background ? `/assets/background/${pengaturan.background}` : '');
    let bg2Preview = $state(pengaturan.background_belakang ? `/assets/background_belakang/${pengaturan.background_belakang}` : '');

    function handlePreview(event: Event, type: string) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (type === 'logo') logoPreview = result;
                if (type === 'ttd') ttdPreview = result;
                if (type === 'bg') bgPreview = result;
                if (type === 'bg2') bg2Preview = result;
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<style>
    .settings-body {
        background-color: #f0f2f5;
        color: #1c1e21;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 20px;
        min-height: 100vh;
    }

    h2 { text-align: center; color: #145DA0; }

    form {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    p { margin-bottom: 15px; }

    label { font-weight: bold; display: block; margin-bottom: 5px; }

    input[type="text"],
    input[type="date"],
    input[type="password"],
    textarea,
    input[type="file"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccd0d5;
        border-radius: 6px;
        background-color: #fff;
        box-sizing: border-box;
    }

    img.preview {
        margin-top: 10px;
        max-width: 100%;
        height: auto;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        background-color: #145DA0;
        color: #fff;
        border: none;
        padding: 12px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        width: 100%;
        margin-top: 10px;
    }

    button:hover { background-color: #004c81; }

    .back-link {
        display: block;
        text-align: center;
        margin-top: 20px;
        color: #145DA0;
        text-decoration: none;
    }

    .back-link:hover { text-decoration: underline; }

    .error { color: #dc3545; text-align: center; margin-bottom: 1rem; }
</style>

<div class="settings-body">
    <h2>Pengaturan Sekolah</h2>
    {#if form?.message}
        <p class="error">{form.message}</p>
    {/if}
    {#if form?.success}
        <p style="color: green; text-align: center;">Profil sekolah berhasil disimpan</p>
    {/if}

    <form method="POST" action="?/simpan" enctype="multipart/form-data" use:enhance>
        <p>
            <label for="nama_sekolah">Nama Sekolah:</label>
            <input type="text" name="nama_sekolah" id="nama_sekolah" value={pengaturan.nama_sekolah} required>
        </p>
        <p>
            <label for="alamat">Alamat:</label>
            <textarea name="alamat" id="alamat" rows="3" required>{pengaturan.alamat}</textarea>
        </p>
        <p>
            <label for="kepala_sekolah">Kepala Sekolah:</label>
            <input type="text" name="kepala_sekolah" id="kepala_sekolah" value={pengaturan.kepala_sekolah} required>
        </p>
        <p>
            <label for="nip_kepala_sekolah">NIP Kepala Sekolah:</label>
            <input type="text" name="nip_kepala_sekolah" id="nip_kepala_sekolah" value={pengaturan.nip_kepala_sekolah} required>
        </p>
        <p>
            <label for="tanggal_ttd">Tanggal TTD:</label>
            <input type="date" name="tanggal_ttd" id="tanggal_ttd" value={pengaturan.tanggal_ttd} required>
        </p>
        <p>
            <label for="logo">Logo (.png):</label>
            <input type="file" name="logo" id="logo" accept=".png" onchange={(e) => handlePreview(e, 'logo')}>
            {#if logoPreview}
                <img src={logoPreview} alt="Logo" class="preview">
            {/if}
        </p>
        <p>
            <label for="tanda_tangan">Tanda Tangan Kepala Sekolah:</label>
            <input type="file" name="tanda_tangan" id="tanda_tangan" onchange={(e) => handlePreview(e, 'ttd')}>
            {#if ttdPreview}
                <img src={ttdPreview} alt="Tanda Tangan" class="preview">
            {/if}
        </p>
        <p>
            <label for="background">Background Kartu:</label>
            <input type="file" name="background" id="background" onchange={(e) => handlePreview(e, 'bg')}>
            {#if bgPreview}
                <img src={bgPreview} alt="Background" class="preview">
            {/if}
        </p>
        <p>
            <label for="background_belakang">Background Kartu Belakang:</label>
            <input type="file" name="background_belakang" id="background_belakang" onchange={(e) => handlePreview(e, 'bg2')}>
            {#if bg2Preview}
                <img src={bg2Preview} alt="Background Belakang" class="preview">
            {/if}
        </p>

        <hr>
        <h3>Ubah Password Admin</h3>
        <p>
            <label for="password_lama">Password Lama:</label>
            <input type="password" name="password_lama" id="password_lama">
        </p>
        <p>
            <label for="password_baru">Password Baru:</label>
            <input type="password" name="password_baru" id="password_baru">
        </p>
        <p>
            <label for="konfirmasi_password">Konfirmasi Password Baru:</label>
            <input type="password" name="konfirmasi_password" id="konfirmasi_password">
        </p>

        <button type="submit">Simpan Pengaturan</button>
    </form>
    <a href="/dashboard" class="back-link">← Kembali ke Dashboard</a>
</div>
