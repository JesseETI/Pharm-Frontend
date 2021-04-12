<template>
  <div>
    <Header />
    <!-- About Page -->
    <body>
      <main>
        <h1 class="text-4xl mt-10 ml-10 mb-2 text-gray-800">
          About UWI Pharmacy
        </h1>
        <hr class="mx-4" />
        <div class="flex justify-around items-center text-gray-800">
          <div class="w-2/6 h-full px-20 text-base">
            <p>
              The UWI Pharmacy provides pharmaceutical services to the campus
              community for both staff and students. Such services include
              pharmaceutical consultation, prescription filling and dispensing
              services. The pharmacy also provides dispensary and prescription
              medication and a wide array of Over-the-Counter (OTC) and
              non-pharmaceutical items which includes:
            </p>
            <div class="my-10">
              <ul class="list-disc list-inside">
                <li>Vitamins and Supplements</li>
                <li>Cough, Cold and Allergy Medications</li>
                <li>Products for Eye, Ear and Digestive Health Care</li>
                <li>First Aid Supplies</li>
                <li>Injury and Wound Care Products</li>
                <li>Personal Care Products</li>
                <li>Stationery Products</li>
              </ul>
            </div>
            <h3 class="text-2xl">Opening Hours</h3>
            <div class="mt-4">
              <span class="text-base underline italic">During Semester:</span>
              <br />
              <span class="text-lg"
                >Monday - Friday (9:00 a.m. - 4:30 p.m.)</span
              >
              <br />
              <br />
              <span class="text-base underline italic"
                >During Vacation Period:</span
              >
              <br />
              <span class="text-lg"
                >Monday - Friday (8:30 a.m. - 4:00 p.m.)</span
              >
            </div>
          </div>
          <div class="w-4/6 h-full p-10">
            <img src="../assets/default.jpeg" alt="Picture of Storefront" />
          </div>
        </div>
      </main>
      <Footer />
    </body>
  </div>
</template>

<script>
import Header from '../components/header/Header'

export default {
  name: 'About',
  components: {
    Header,
  },
}
</script>
