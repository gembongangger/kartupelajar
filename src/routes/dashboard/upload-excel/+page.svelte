<script lang="ts">
    import { enhance } from '$app/forms';
    let { form } = $props();

    let submitting = $state(false);

    function handleSubmit() {
        submitting = true;
        return async ({ result }: { result: any }) => {
            submitting = false;
        };
    }
</script>

<style>
    .upload-body { font-family: Arial, sans-serif; background-color: #182c47; color: #fff; margin: 0; padding: 20px; min-height: 100vh; }
    h2 { text-align: center; }
    .container { max-width: 600px; margin: 0 auto; }
    form { background-color: #243b5e; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); }
    input[type="file"] { width: 100%; padding: 10px; margin-top: 10px; background: #f0f0f0; border-radius: 5px; color: #000; box-sizing: border-box; }
    button {
        width: 100%; background-color: #4267B2; color: white; padding: 12px; border: none;
        margin-top: 10px; border-radius: 5px; cursor: pointer;
        display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    button:hover { background-color: #365899; }
    button:disabled { background-color: #8ba6d9; cursor: not-allowed; }

    .spinner {
        width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
        border-top: 2px solid #fff; border-radius: 50%; animation: spin 0.6s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .info { background: #e7f3ff; color: #182c47; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    .error-log { background: #ffeded; color: #b71c1c; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 14px; text-align: left; }
    .error-log h4 { margin-top: 0; border-bottom: 1px solid #b71c1c; padding-bottom: 5px; }
    .link { text-align: center; margin-top: 20px; }
    .link a { color: #fff; text-decoration: none; font-weight: bold; }
    .template-link { display: inline-block; margin-bottom: 15px; color: #00c3ff; text-decoration: none; font-size: 0.9rem; }
    .template-link:hover { text-decoration: underline; }
</style>

<div class="upload-body">
    <div class="container">
        <h2>Upload Excel Siswa</h2>

        {#if form}
            <div class="info">
                <strong>Hasil Upload:</strong><br>
                ✅ Berhasil: {form.success} | ❌ Gagal: {form.failed}
            </div>

            {#if form.errorDetails && form.errorDetails.length > 0}
                <div class="error-log">
                    <h4>Detail Kesalahan:</h4>
                    <ul>
                        {#each form.errorDetails as err}
                            <li>{err}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
        {/if}

        <form method="POST" enctype="multipart/form-data" use:enhance={handleSubmit}>
            <a href="/format_data_siswa.xls" class="template-link" download>⬇️ Download Template Excel (.xls)</a>
            <input type="file" name="file" accept=".xls, .xlsx" required>
            <button type="submit" disabled={submitting}>
                {#if submitting}
                    <span class="spinner"></span>
                    Memproses...
                {:else}
                    Proses Upload
                {/if}
            </button>
        </form>

        <div class="link">
            <p><a href="/dashboard">← Kembali ke Dashboard</a></p>
        </div>
    </div>
</div>
