<script lang="ts">
    import { enhance } from '$app/forms';
    let { form } = $props();
</script>

<style>
    .upload-foto-body { font-family: sans-serif; padding: 20px; }
    input[type="file"] { margin-bottom: 10px; }
    .back-link { display: block; margin-top: 20px; color: #007bff; text-decoration: none; }
</style>

<div class="upload-foto-body">
    <h2>Upload Foto Siswa Massal</h2>
    <p><strong>Catatan:</strong> Pastikan nama file = <code>NISN.jpg</code> (contoh: <code>3219876540.jpg</code>)</p>

    <form method="POST" enctype="multipart/form-data" use:enhance>
        <input type="file" name="fotos" accept=".jpg" multiple required><br>
        <button type="submit">Upload</button>
    </form>

    {#if form}
        <p>✅ Berhasil upload: <strong>{form.berhasil}</strong><br>❌ Gagal: <strong>{form.gagal}</strong></p>
    {/if}

    <a href="/dashboard" class="back-link">← Kembali ke Dashboard</a>
</div>
