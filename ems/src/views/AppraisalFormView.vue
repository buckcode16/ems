<template>
  <!-- Header -->
  <div class="grid grid-cols-2 gap-4 place-content-between items-center">
    <div>
      <button
        class="mt-4 rounded-lg border-2 border-blue-700 px-6 py-2 font-medium text-blue-700"
      >
        Confirm
      </button>
    </div>
  </div>
  <hr class="my-4" />
  <!-- Content -->
  <div class="m-5 pt-4">
    <!-- Employee Name -->
    <div>
      <input
        type="text"
        class="mt-1 block rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="e.g. John Doe"
      />
    </div>

    <!-- Manager Date Department -->

    <div class="grid grid-cols-2 gap-4 my-4">
      <!-- Manager -->
      <div class="flex flex-col">
        <p>Manager</p>
        <input
          type="text"
          class="mt-1 block rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder=""
        />
      </div>
      <!-- Department -->
      <div><p>Department</p></div>
      <!-- Date -->
      <div>
        <p>Appraisal Date</p>
        <input
          type="date"
          class="mt-1 block rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>

    <!-- Feedback Grid -->
    <div class="mt-6">
      <p>Appraisals</p>
      <div class="grid grid-cols-2 border rounded-md border-gray-300 my-4">
        <!-- Employee's Feedback -->
        <div class="m-4 feedback-section border-r">
          <h1>Employee's Feedback</h1>
          <h2>My work</h2>
          <h3>What are my best achievement(s) since my last appraisal?</h3>
          <p>
            Describe something that made you proud, a piece of work positive for
            the company.
          </p>
          <input
            type="text"
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
          <h3>
            What has been the most challenging aspect of my work this past year
            and why?
          </h3>
          <p>
            Did you face new difficulties? Did you confront yourself to new
            obstacles?
          </p>
          <input
            type="text"
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
          <h3>What would I need to improve my work?</h3>
          <p>
            How can the company help you with your need and objectives in order
            for you to reach your goals and look for the best collaboration.
          </p>
          <input
            type="text"
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
          <h2>My Future</h2>
          <h3>
            What are my short and long-term goals with the company, and for my
            career?
          </h3>
          <ul>
            <li>
              <p>Give an example of short-term objective</p>
              <input
                type="text"
                class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
              />
            </li>
            <li>
              <p>Give an example of long-term objective (> 6 months)</p>
              <input
                type="text"
                class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder=""
              />
            </li>
          </ul>
          <h3>
            Which parts of my job do I most / least enjoy?
          </h3>

          <p>
            Every job has strong points, what are, in your opinion, the tasks
            that you enjoy the most/the least?
          </p>
          <input
            type="text"
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </div>
        <!-- Manager's Feedback -->
        <div class="m-4 feedback-section">
          <h1>Manager's Feedback</h1>
          <h2>Feedback</h2>
          <h3>
            Give one positive achievement that convinced you of the employee's
            value.
          </h3>
          <p>
            Some achievements comforting you in their strengths to face job's
            issues.
          </p>
          <input
            type="text"
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
          <h2 class="mb-2">Evaluation</h2>

          <div class="flex gap-4 items-center">
            <p>Stress Resistance</p>
            <StarRating
              :initialRating="ratingField1"
              @update:rating="ratingField1 = $event"
            />
          </div>
          <div class="flex gap-4 items-center">
            <p>Time Management</p>
            <StarRating
              :initialRating="ratingField2"
              @update:rating="ratingField2 = $event"
            />
          </div>
          <div class="flex gap-4 items-center">
            <p>Teamwork</p>
            <StarRating
              :initialRating="ratingField3"
              @update:rating="ratingField3 = $event"
            />
          </div>
          <div class="flex gap-4 items-center">
            <p>Autonomy</p>
            <StarRating
              :initialRating="ratingField4"
              @update:rating="ratingField4 = $event"
            />
          </div>
          <div class="flex gap-4 items-center">
            <p>Pro-activity</p>
            <StarRating
              :initialRating="ratingField5"
              @update:rating="ratingField5 = $event"
            />
          </div>
          <h2>Improvements</h2>
          <h3>
            How could the employee improve?
          </h3>
          <p>
            From a manager point of view, how could you help the employee to
            overcome their weaknesses?
          </p>
          <input
            type="text"
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
          <h3>
            Short term (6-months) actions / decisions / objectives
          </h3>
          <p>
            Do you need rapid answer to the current situation?
          </p>
          <input
            type="text"
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
          <h3>
            Long term (> 6 months) career discussion, where does the employee
            wants to go, how to help them reach this path?
          </h3>
          <p>
            How do you see the employee in the future, do your vision follow the
            employee's desire?
          </p>
          <input
            type="text"
            class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StarRating from '../components/StarRating.vue'
const ratingField1 = ref(0)
const ratingField2 = ref(0)
const ratingField3 = ref(0)
const ratingField4 = ref(0)
const ratingField5 = ref(0)
</script>

<style scoped>
.feedback-section p {
  margin-bottom: 1rem;
}

h2 {
  padding-top: 2rem;
  font-weight: bold;
}

p {
  font-style: italic;
  color: rgb(155, 155, 155);
}
</style>
