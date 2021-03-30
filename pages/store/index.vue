<template>
  <div>
    <Header />
    <main>
      <div class="m-10">
        <h2 class="text-gray-500">Store</h2>
        <br />
        <hr />

        <div class="flex">
          <div class="categories w-1/5">
            <Categories />
          </div>

          <div class="products w-4/5">
            <Listing />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
