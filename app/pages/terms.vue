<template>
  <main class="terms-page">
    <article class="terms-container">
      <header class="terms-header">
        <h1 class="">Terms of Use</h1>
        <p class="">Terms and conditions of use</p>
        <div class="terms-divider"></div>
      </header>

      <div class="terms-content">
        <section v-for="(section, index) in termsData" :key="index">
          <h2>{{ section.title }}</h2>
          <div class="section-body">
            <p
              v-for="(paragraph, pIndex) in section.paragraphs"
              :key="pIndex"
              :class="{ 'indent-text': paragraph.trim().startsWith('(') }"
            >
              {{ paragraph }}
            </p>
          </div>
        </section>
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { useSEO } from '~/utils/seo.utils'
import { RouteName } from '~/constants/route-names'

definePageMeta({
  name: 'terms',
  pageTitle: 'Terms & Conditions',
  pageLabel: 'Terms of Use'
})

useSEO({
  title: 'Terms of Use | Elite Wholesalers',
  description:
    'Read the terms and conditions for using the Elite Wholesalers website and purchasing our products.',
  keywords: 'terms of use, terms and conditions, elite wholesalers legal, policy'
})

// Extracted data to keep the template clean
const termsData = [
  {
    title: '1. INTRODUCTION',
    paragraphs: [
      '1.1 These terms and conditions shall govern your use of our website.',
      '1.2 By using our website, you accept these terms and conditions in full; accordingly, if you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website.',
      '1.3 If you register with our website, submit any material to our website or use any of our website services, we will ask you to expressly agree to these terms and conditions.',
      '1.4 You must be at least 18 years of age to use our website; by using our website or agreeing to these terms and conditions, you warrant and represent to us that you are at least 18 years of age.',
      '1.5 Our website uses cookies; by using our website or agreeing to these terms and conditions, you consent to our use of cookies in accordance with the terms of our [privacy and cookies policy].'
    ]
  },
  {
    title: '2. COPYRIGHT NOTICE',
    paragraphs: [
      'ELITE WHOLESALERS PTY LTD...',
      '2.2 Subject to the express provisions of these terms and conditions:',
      '(a) we, together with our licensors, own and control all the copyright and other intellectual property rights in our website and the material on our website; and',
      '(b) All the copyright and other intellectual property rights in our website and the material on our website are reserved.'
    ]
  },
  {
    title: '3. LICENCE TO USE WEBSITE',
    paragraphs: [
      '3.1 You may:',
      '(a) view pages from our website in a web browser;',
      '(b) download pages from our website for caching in a web browser;',
      '(c) print pages from our website;',
      '(d) stream audio and video files from our website; and',
      '(e) use our website services by means of a web browser',
      'subject to the other provisions of these terms and conditions.',
      '3.2 Except as expressly permitted by Section 4.1 or the other provisions of these terms and conditions, you must not download any material from our website or save any such material to your computer.',
      '3.3 You may only use our website for [your own personal and business purposes, and you must not use our website for any other purposes.',
      '3.4 Except as expressly permitted by these terms and conditions, you must not edit or otherwise modify any material on our website.',
      '3.5 Unless you own or control the relevant rights in the material, you must not:',
      '(a) republish material from our website (including republication on another website);',
      '(b) sell, rent or sub-license material from our website;',
      '(c) show any material from our website in public;',
      '(d) exploit material from our website for a commercial purpose; or',
      '(e) redistribute material from our website.',
      '3.6 Notwithstanding Section 4.5, you may redistribute [our newsletter in print and electronic form] to any person.',
      '3.7 We reserve the right to restrict access to areas of our website, or indeed our whole website, at our discretion; you must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction measures on our website.'
    ]
  },
  {
    title: '4. ACCEPTABLE USE',
    paragraphs: [
      '4.1 You must not:',
      '(a) use our website in any way or take any action that causes, or may cause, damage to the website or impairment of the performance, availability or accessibility of the website;',
      '(b) use our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity;',
      '(c) use our website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software;',
      '(d) conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to our website without our express written consent;',
      '(e) access or otherwise interact with our website using any robot, spider or other automated means[, except for the purpose of search engine indexing;',
      '(f) violate the directives set out in the robots.txt file for our website; or',
      '(g) use data collected from our website for any direct marketing activity (including without limitation email marketing, SMS marketing, telemarketing and direct mailing).',
      '4.2 You must not use data collected from our website to contact individuals, companies or other persons or entities.',
      '4.3 You must ensure that all the information you supply to us through our website, or in relation to our website, is [true, accurate, current, complete and non-misleading.'
    ]
  },
  {
    title: '5. REGISTRATION AND ACCOUNTS',
    paragraphs: [
      '5.1 To be eligible for an individual account on our website under this Section 1.4, you must be at least 18 years of age and resident in the Australia.',
      '5.2 You may register for an account with our website by completing and submitting the account registration form on our website, and clicking on the verification link in the email that the website will send to you.',
      '5.3 You must not allow any other person to use your account to access the website.',
      '5.4 You must notify us in writing immediately if you become aware of any unauthorised use of your account.',
      '5.5 You must not use any other person’s account to access the website, unless you have that person’s express permission to do so.'
    ]
  },
  {
    title: '6. USER LOGIN DETAILS',
    paragraphs: [
      '6.1 If you register for an account with our website, we will provide you with OR you will be asked to choose a user ID and password.',
      '6.2 Your user ID must not be liable to mislead and must comply with the content rules set out in this document; you must not use your account or user ID for or in connection with the impersonation of any person.',
      '6.3 You must keep your password confidential.',
      '6.4 You must notify us in writing immediately if you become aware of any disclosure of your password.',
      '6.5 You are responsible for any activity on our website arising out of any failure to keep your password confidential, and may be held liable for any losses arising out of such a failure.'
    ]
  },
  {
    title: '7. CANCELLATION AND SUSPENSION OF ACCOUNT',
    paragraphs: [
      '7.1 We may:',
      '(a) suspend your account;',
      '(b) cancel your account; and/or',
      '(c) edit your account details',
      'at any time in our sole discretion without notice or explanation.',
      '7.2 You may cancel your account on our website using your account control panel on the website.'
    ]
  },
  {
    title: '8. LIMITED WARRANTIES',
    paragraphs: [
      '8.1 We do not warrant or represent:',
      '(a) the completeness or accuracy of the information published on our website;',
      '(b) that the material on the website is up to date; or',
      '(c) that the website or any service on the website will remain available.',
      '8.2 We reserve the right to discontinue or alter any or all of our website services, and to stop publishing our website, at any time in our sole discretion without notice or explanation; and save to the extent expressly provided otherwise in these terms and conditions, you will not be entitled to any compensation or other payment upon the discontinuance or alteration of any website services, or if we stop publishing the website.',
      '8.3 To the maximum extent permitted by applicable law and subject to Section 12.1, we exclude all representations and warranties relating to the subject matter of these terms and conditions, our website and the use of our website',
      '8.4 WARRANTY: During the term, the warranty of the products supplied by Elite Wholesalers P/L known as (Part A) shall provide Part B known as (customer) free repairs within the first 3 months or replacement as necessary for defective equipment within the manufacturer’s warranty period. A Labour charge will apply for any product returned after the 3 months period (Parts if still with in the warranty period for the product will be covered free of charge. Party B will ship the defective equipment to party A at its expense and party A will repair or replace the said equipment and ship it back to party B at its expense. For equipment outside the warranty period Party B will pay for all shipment costs and also for repair charges. Party B takes on the responsibility of the warranty period and may choose to pass on the manufacturer’s warranty to clients or not, Party A has no obligations to Party B clients or to extend warranty to Part b client. RETURNS:We may except returns if the equipment (item) is not fit for purpose with in 14 days, the item/items being returned must be in original condition and un opened. Hard Drives are sensitive equipment and we are not able to except returns. All returns if excepted carry a 30% restocking fee. No refunds on any SALE ITEMS, No refunds on pre orders or on any items we have ordered in for the sale.'
    ]
  },
  {
    title: '9. LIMITATIONS AND EXCLUTIONS OF LIABILITY',
    paragraphs: [
      '9.1 To the extent that our website and the information and services on our website are provided free of charge, we will not be liable for any loss or damage of any nature.',
      '9.2 We will not be liable to you in respect of any losses arising out of any event or events beyond our reasonable control.',
      '9.3 We will not be liable to you in respect of any business losses, including (without limitation) loss of or damage to profits, income, revenue, use, production, anticipated savings, business, contracts, commercial opportunities or goodwill.',
      '9.4 We will not be liable to you in respect of any loss or corruption of any data, database or software.',
      '9.5 We will not be liable to you in respect of any special, indirect or consequential loss or damage.',
      '9.6 You accept that we have an interest in limiting the personal liability of our officers and employees and, having regard to that interest, you acknowledge that we are a limited liability entity; you agree that you will not bring any claim personally against our officers or employees in respect of any losses you suffer in connection with the website or these terms and conditions (this will not, of course, limit or exclude the liability of the limited liability entity itself for the acts and omissions of our officers and employees).'
    ]
  },
  {
    title: '10. BREACHES OF THESE TERMS AND CONDITIONS',
    paragraphs: [
      '10.1 Without prejudice to our other rights under these terms and conditions, if you breach these terms and conditions in any way, or if we reasonably suspect that you have breached these terms and conditions in any way, we may:',
      '(a) Send you one or more formal warnings;',
      '(b) Temporarily suspend your access to our website;',
      '(c) Permanently prohibit you from accessing our website;',
      '(d) Block computers using your IP address from accessing our website;',
      '(e) Contact any or all of your internet service providers and request that they block your access to our website;',
      '(f) Commence legal action against you, whether for breach of contract or otherwise; and/or',
      '(g) Suspend or delete your account on our website.',
      '10.2 Where we suspend or prohibit or block your access to our website or a part of our website, you must not take any action to circumvent such suspension or prohibition or blocking (including without limitation creating and/or using a different account.'
    ]
  },
  {
    title: '11. VARIATION',
    paragraphs: [
      '11.1 We may revise these terms and conditions from time to time.',
      '11.2 The revised terms and conditions shall apply to the use of our website from the date of publication of the revised terms and conditions on the website, and you hereby waive any right you may otherwise have to be notified of, or to consent to, revisions of these terms and conditions. OR [We will give you written notice of any revision of these terms and conditions, and the revised terms and conditions will apply to the use of our website from the date that we give you such notice; if you do not agree to the revised terms and conditions, you must stop using our website.',
      '11.3 If you have given your express agreement to these terms and conditions, we will ask for your express agreement to any revision of these terms and conditions; and if you do not give your express agreement to the revised terms and conditions within such period as we may specify, we will disable or delete your account on the website, and you must stop using the website.'
    ]
  },
  {
    title: '12. ASSIGNMENT',
    paragraphs: [
      '12.1 You hereby agree that we may assign, transfer, sub-contract or otherwise deal with our rights and/or obligations under these terms and conditions.',
      '12.2 You may not without our prior written consent assign, transfer, sub-contract or otherwise deal with any of your rights and/or obligations under these terms and conditions'
    ]
  },
  {
    title: '13. ENTIRE AGREEMENT',
    paragraphs: [
      '13.1 Subject to Sections , these terms and conditions, together with our privacy and cookies policy, shall constitute the entire agreement between you and us in relation to your use of our website and shall supersede all previous agreements between you and us in relation to your use of our website'
    ]
  },
  {
    title: '14. OUR DETAILS',
    paragraphs: [
      '14.1 This website is owned and operated by Elite Wholesalers Pty Ltd',
      '14.2 We are registered in Australia under ABN 73 611 475 131, and our registered office is at 1/9 Stanley street Peakhurst NSW 2210 Australia.',
      '14.3 Our principal place of business is at 1/9 Stanley Street Peakhurst NSW 2210',
      '14.4 You can contact us:',
      '(a) by post, using the postal address given the above address;',
      '(b) using our website contact form;',
      '(c) by telephone, on the contact number published on our website.'
    ]
  }
]
</script>

<style scoped>
.terms-page {
  padding: 3rem 1.5rem;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  color: var(--color-gray-800, #1f2937); /* Fallback color, will adapt if you have CSS variables */
}

.terms-container {
  max-width: 56rem;
  margin: 0 auto;
}

.terms-header {
  text-align: center;
  margin-bottom: 3rem;
}

.terms-header h1 {
  font-size: 2.25rem;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
  color: var(--color-gray-900, #111827);
}

.terms-header p {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-gray-500, #6b7280);
  margin: 0;
}

.terms-divider {
  width: 4rem;
  height: 0.25rem;
  background-color: var(--color-primary-500, #0ea5e9);
  margin: 1.5rem auto 0 auto;
  border-radius: 9999px;
}

.terms-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  line-height: 1.75;
  font-size: 1rem;
}

.terms-content h2 {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--color-gray-900, #111827);
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-body p {
  margin: 0;
}

/* Dynamically applied via the template class binding for list items like (a), (b) */
.indent-text {
  padding-left: 1.5rem;
}

/* Inherit dark mode colors naturally if the global layout provides them */
:global(.dark) .terms-page {
  color: #d1d5db;
}

:global(.dark) .terms-header h1,
:global(.dark) .terms-content h2 {
  color: #f9fafb;
}

:global(.dark) .terms-header p {
  color: #9ca3af;
}

@media (max-width: 640px) {
  .terms-page {
    padding: 2rem 1rem;
  }
  .terms-header h1 {
    font-size: 1.875rem;
  }
}
</style>
