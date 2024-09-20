<script lang="ts">
  import beprcLogo from "$lib/assets/images/beprc_logo.jpg";
  import pgcbLogo from "$lib/assets/images/pgcb_logo.png";
  import Simulation from "$lib/components/Simulation.svelte";
</script>

<div class="min-h-full">
  <div class="bg-primary pb-32">
    <header class="py-14">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mb-8 flex items-center justify-center gap-10">
          <img src={beprcLogo} alt="BEPRC Logo" class="h-32" />
          <h1
            class="text-center text-3xl font-bold tracking-tight text-background"
          >
            Cyber–Physical Systems Testbed
          </h1>
          <img src={pgcbLogo} alt="PGCB Logo" class="h-32" />
        </div>
      </div>
    </header>
  </div>

  <main class="-mt-32 grid grid-cols-2 gap-4">
    <div class="relative flex flex-col px-4 pr-0 sm:px-6 lg:px-8">
      <section
        class="w-full self-center rounded-lg bg-primary-foreground px-5 py-6 shadow sm:px-6"
      >
        <iframe
          src="http://127.0.0.1:1881/"
          title="Node-RED canvas"
          frameborder="0"
          class="w-full rounded-lg"
          style="height: 600px;"
        ></iframe>
      </section>
    </div>

    <div class="relative flex flex-col px-4 pr-0 sm:px-6 lg:px-8">
      <section
        class="w-full self-center rounded-lg bg-primary-foreground px-5 py-6 shadow sm:px-6"
      >
        <div class="flex h-full flex-col overflow-hidden border">
          <Simulation class="flex-grow" />
        </div>
      </section>
    </div>
  </main>
</div>

<style>
  main {
    text-align: center;
    padding: 2rem;
  }

  iframe {
    height: 600px; /* Adjust height as needed */
    width: 100%; /* Ensure iframe is responsive */
  }

  .w-full {
    width: 100%;
  }

  .h-full {
    height: 100%; /* Ensure it fills the height of the parent */
  }

  .border {
    height: 600px; /* Set a fixed height or adjust as necessary */
    overflow: auto; /* Prevent overflow */
  }

  /* Ensure Simulation component takes full space and shrinks */
  .flex-grow {
    flex-grow: 1; /* Allow the component to grow and shrink as needed */
    min-height: 0; /* Prevent overflow in flex container */
  }
</style>
