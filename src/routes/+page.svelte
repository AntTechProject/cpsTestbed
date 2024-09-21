<script lang="ts">
  import { onMount } from "svelte";
  import beprcLogo from "$lib/assets/images/beprc_logo.jpg";
  import pgcbLogo from "$lib/assets/images/pgcb_logo.png";
  import Simulation from "$lib/components/Simulation.svelte";

  let showSimulation = false;

  function runSimulation() {
    showSimulation = false; // Ensure the simulation is hidden initially
    setTimeout(() => {
      showSimulation = true; // Show simulation after 3 seconds
    }, 3000);
  }
</script>

<div class="min-h-full">
  <!-- Header with logos -->
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

  <!-- Main content (stacked vertically) -->
  <main class="grid grid-cols-1 gap-4">
    <!-- Top Section (Node-RED iframe) -->
    <div class="relative flex flex-col px-4 sm:px-6 lg:px-8">
      <section
        class="w-full self-center rounded-lg bg-primary-foreground px-5 py-6 shadow sm:px-6"
      >
        <h2 class="mb-4 text-xl font-semibold">
          Real-Time Data (Node-RED Interface)
        </h2>
        <iframe
          src="http://127.0.0.1:1881/"
          title="Node-RED canvas"
          frameborder="0"
          class="w-full rounded-lg"
          style="height: 600px;"
        ></iframe>
      </section>
      <!-- Run Simulation Button -->
      <div class="mt-4 flex justify-center">
        <button
          on:click={runSimulation}
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white"
        >
          Run Simulation
        </button>
      </div>
    </div>

    <!-- Bottom Section (Simulation Rendering) -->
    {#if showSimulation}
      <div class="relative flex flex-col px-4 sm:px-6 lg:px-8">
        <section
          class="w-full self-center rounded-lg bg-primary-foreground px-5 py-6 shadow sm:px-6"
        >
          <h2 class="mb-4 text-xl font-semibold">Simulation Visualization</h2>
          <div
            class="flex h-full flex-col items-center justify-center overflow-hidden"
          >
            <div
              class="flex max-h-[600px] w-full flex-auto flex-col items-center justify-center overflow-auto"
            >
              <div class="min-h-0 w-full flex-auto">
                <Simulation />
              </div>
            </div>
          </div>
        </section>
      </div>
    {/if}
  </main>
</div>

<style>
  /* Ensure no horizontal scroll */
  body {
    overflow-x: hidden;
  }

  /* Additional clarity for smaller screens */
  @media (max-width: 640px) {
    header h1 {
      font-size: 1.5rem;
    }
    header img {
      height: 24px;
    }
  }
</style>
