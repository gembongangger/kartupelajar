<script lang="ts">
    let { data } = $props();
</script>

<style>
    .pilih-body {
        font-family: Arial, sans-serif;
        background: #f2f2f2;
        padding: 20px;
        margin: 0;
        min-height: 100vh;
    }

    .container {
        max-width: 480px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 8px rgba(0,0,0,0.1);
    }

    h2 { text-align: center; color: #333; }

    label { display: block; margin-bottom: 8px; font-weight: bold; }

    select {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    button {
        width: 100%;
        padding: 12px;
        margin-top: 20px;
        background-color: #2d4373;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }

    button:hover { background-color: #1d2d50; }

    .back-link {
        display: block;
        text-align: center;
        margin-top: 20px;
        text-decoration: none;
        color: #2d4373;
        font-weight: bold;
    }

    .back-link:hover { text-decoration: underline; }

    @media (max-width: 600px) {
        .container { padding: 15px; }
    }
</style>

<div class="pilih-body">
    <div class="container">
        <h2>Cetak Kartu Pelajar</h2>

        <form method="GET" action="/dashboard/cetak" target="_blank">
            <label for="kelas">Pilih Kelas:</label>
            <select name="kelas" id="kelas" required>
                <option value="">-- Pilih Kelas --</option>
                {#each data.classes as k}
                    <option value={k.kelas}>{k.kelas}</option>
                {/each}
            </select>

            <button type="submit">Cetak Kartu</button>
        </form>

        <a href="/dashboard" class="back-link">← Kembali ke Dashboard</a>
    </div>
</div>
