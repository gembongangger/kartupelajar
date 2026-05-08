<script lang="ts">
    import { enhance } from '$app/forms';
    let { data, form } = $props();
</script>

<style>
    .dashboard-body {
        font-family: Arial, sans-serif;
        padding: 20px;
        margin: 0;
        background-color: #f4f4f4;
        min-height: 100vh;
    }
    h2 {
        text-align: center;
        color: #003366;
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 20px auto;
        max-width: 400px;
    }
    li {
        margin-bottom: 15px;
    }

    a, button {
        display: block;
        width: 100%;
        color: white;
        padding: 12px;
        border-radius: 8px;
        text-decoration: none;
        text-align: center;
        transition: background-color 0.2s ease;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        box-sizing: border-box;
    }

    .excel { background-color: #217346; }
    .excel:hover { background-color: #1e5e3e; }

    .powerpoint { background-color: #d24726; }
    .powerpoint:hover { background-color: #a7351c; }

    .word { background-color: #2b579a; }
    .word:hover { background-color: #1e3e73; }

    .canva { background-color: #00c4cc; }
    .canva:hover { background-color: #009aa1; }

    .whatsapp { background-color: #25D366; }
    .whatsapp:hover { background-color: #1da851; }

    .danger { background-color: #c62828; }
    .danger:hover { background-color: #a32020; }

    .default { background-color: #003366; }
    .default:hover { background-color: #001f4d; }

    @media (max-width: 480px) {
        a, button {
            font-size: 16px;
            padding: 10px;
        }
    }
    .status { text-align: center; margin-bottom: 10px; font-weight: bold; }
</style>

<div class="dashboard-body">
    <h2>Selamat datang, {data.user.username}!</h2>
    {#if form?.success}
        <p class="status" style="color: green;">{form.message}</p>
    {/if}
    {#if form?.message && !form.success}
        <p class="status" style="color: red;">{form.message}</p>
    {/if}
    <ul>
        <li><a href="/dashboard/upload-excel" class="excel">Upload Data Siswa EXCEL (xls)</a></li>
        <li><a href="/dashboard/upload-foto" class="powerpoint">Upload Foto Siswa (Pilih)</a></li>
        <li><a href="/dashboard/pengaturan" class="word">Pengaturan Profil Sekolah</a></li>
        <li><a href="/dashboard/pilih-kelas" class="canva">Cetak Kartu Per Kelas</a></li>
        <li><a href="/dashboard/cetak" class="default" target="_blank">Cetak Semua Kartu</a></li>
        <li><a href="/dashboard/siswa" class="default">Daftar Nama Siswa</a></li>
        <li><a href="https://chat.whatsapp.com/KtdYP6nx3eZLVhqJkQ1Zbs?mode=r_c" class="whatsapp" target="_blank">Gabung Grup WA</a></li>
        <li>
            <form method="POST" action="?/reset" use:enhance={() => {
                return async ({ result }) => {
                    if (confirm('Yakin ingin mereset database? Semua data akan hilang!')) {
                        // Allow
                    } else {
                        return;
                    }
                };
            }}>
                <button type="submit" class="danger">RESET DATABASE</button>
            </form>
        </li>
        <li><form method="POST" action="/logout"><button type="submit" class="default">Logout</button></form></li>
    </ul>
</div>
