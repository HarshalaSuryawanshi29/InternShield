export interface SampleOffer {
  id: string;
  title: string;
  badge: string;
  badgeType: 'danger' | 'success' | 'caution';
  company: string;
  role: string;
  text: string;
  notes: string;
}

export const SAMPLES: Record<string, SampleOffer> = {
  suspicious: {
    id: 'suspicious-sample-1',
    title: 'Suspicious Offer Example (Global)',
    badge: 'Fictional High-Risk Example',
    badgeType: 'danger',
    company: 'Apex Global Logistics LLC (Fictional)',
    role: 'Remote Data Entry & Research Intern',
    text: `Subject: URGENT: Job Offer Notification - Remote Research Intern ($70/hr)
From: Apex Global Careers <apex.hr.onboarding2026@gmail.com>
Date: October 23, 2026

Dear Student,

Congratulations! After reviewing your public profile, the executive hiring board of Apex Global Logistics LLC is pleased to formally offer you the position of Remote Research & Data Operations Intern. 

JOB DETAILS:
- Role: Junior Remote Operations Intern
- Compensation: $70.00 per hour (20-30 hours per week)
- Location: 100% Remote / Work from Home
- Benefits: Full health insurance, $2,500 monthly study stipend

Because of our rapid expansion, you have been selected immediately without any formal phone or video interview. Your work will begin this Monday.

NEXT STEPS & EQUIPMENT SETUP:
1. To confirm your placement, send a photo of your Driver's License (front & back) and your primary bank account routing number for instant direct deposit setup.
2. To configure your corporate secure workstation (Apple MacBook Pro M3 & dual 4K monitors), our accounting department will issue you an electronic check for $3,450. You must mobile-deposit this check within 24 hours. Once deposited, wire $3,200 via Zelle or Bitcoin ATM to our certified IT vendor (it-setup-dispatch@gmail.com) who will ship your pre-configured hardware.
3. You must also pay a mandatory $150 background clearance insurance fee via Apple Gift Card or CashApp to reserve your employee ID tag. This will be reimbursed on your first paycheck.

Please respond within 12 hours via Telegram (@ApexHROnboardingLead) to finalize your employment credentials.

Warm regards,
David Sterling
Chief Talent Director
Apex Global Logistics LLC (Fictional Entity)`,
    notes: 'Strong recruitment risk indicators: Unrealistic hourly wage for entry-level work, generic @gmail.com address, instant hiring with zero interview, fake check advance for equipment, and demands for Zelle/gift card payments.'
  },

  credible: {
    id: 'credible-sample-1',
    title: 'More Credible Offer Example (Global)',
    badge: 'Fictional Credible Example',
    badgeType: 'success',
    company: 'Meridian Cloud Technologies (Fictional)',
    role: 'Summer Software Engineering Intern',
    text: `Subject: Offer of Employment - Summer 2027 Software Engineering Internship
From: Meridian University Talent <campus-recruiting@meridiancloud.tech>
Date: October 20, 2026

Dear Candidate,

Following your final technical interview with our Distributed Systems team on October 14th and your campus interview at the University Career Expo, we are thrilled to offer you a position as a Summer Software Engineering Intern at Meridian Cloud Technologies Inc.

OFFER HIGHLIGHTS:
- Position: Software Engineering Intern (Cloud Infrastructure)
- Location: Seattle, WA (Hybrid: 3 days in-office, 2 days remote) or Remote (US-eligible)
- Term: June 1, 2027 through August 20, 2027 (12 weeks)
- Compensation: $42.00 per hour ($1,680/week gross, paid bi-weekly via standard payroll direct deposit)
- Relocation / Housing Stipend: $3,000 lump sum (disbursed with first paycheck)
- Mentorship: You will be paired with a dedicated Staff Engineer and an Engineering Manager

EQUIPMENT & ONBOARDING POLICY:
All required equipment (16-inch MacBook Pro, peripheral accessories, and security hardware tokens) will be provisioned by Meridian IT and shipped directly to your residence at zero cost to you. Meridian will never ask you to purchase equipment, deposit third-party checks, or wire funds to any vendor.

FORMAL ACCEPTANCE & PAPERWORK:
To review the complete written agreement, intellectual property terms, and benefit summaries, please log in to our secure applicant portal at https://careers.meridiancloud.tech/login using your previously created credentials. Standard I-9 and W-4 verification will take place securely through our corporate Workday portal after acceptance.

This offer remains open until November 15, 2026, allowing you ample time to consult your university career center or academic advisor.

We were truly impressed by your algorithmic problem-solving and system architecture discussion during the interviews, and we look forward to welcoming you to the Meridian engineering team.

Sincerely,

Elena Vasquez
Senior Campus Recruiting Partner
Meridian Cloud Technologies Inc.
elena.vasquez@meridiancloud.tech
Direct Office: (206) 555-0182`,
    notes: 'Conforms to established collegiate recruitment practices: Verified custom domain (@meridiancloud.tech), clear multi-round interview history, competitive market rate, employer-provisioned equipment, formal ATS portal, and generous decision deadline.'
  },

  indianSuspicious: {
    id: 'suspicious-india-1',
    title: 'Suspicious Offer (Indian Context)',
    badge: 'Fictional High-Risk Indian Example',
    badgeType: 'danger',
    company: 'Global Infotech Solutions Pvt Ltd (Fictional)',
    role: 'Virtual Cloud Support Intern',
    text: `Subject: SELECTION LETTER: Direct Joining as Software Intern (Stipend: ₹45,000/month)
From: HR Placement Desk <infotech.virtual.careers2026@gmail.com>
Platform: Sent via WhatsApp & Unofficial Email
Date: October 22, 2026

Dear Student,

Congratulations! Based on your LinkedIn profile registration, you have been shortlisted and directly selected for the 6-Month Remote Virtual Internship Program at Global Infotech Solutions Pvt Ltd (Fictional Entity).

PROGRAM TERMS:
- Monthly Stipend: ₹45,000 per month (Guaranteed payment on 1st of every month)
- Position: Cloud Support & Testing Trainee
- Selection: Immediate selection without technical coding round or HR interview

MANDATORY REGISTRATION & ONBOARDING REQUIREMENTS:
1. To confirm your employee slot and ship your corporate Lenovo ThinkPad laptop to your home address, you must pay a refundable Courier & Asset Security Deposit of ₹1,850.
2. Send the deposit of ₹1,850 via Google Pay, PhonePe, or Paytm UPI to our accounts coordinator UPI ID: 'hr-clearance-desk@okhdfcbank'.
3. Submit clear photographs of your Aadhaar Card (front & back), PAN card, and bank passbook cancelled cheque directly on WhatsApp (+91-98200-XXXXX) for immediate verification.
4. If the ₹1,850 fee is not paid within 4 hours, your seat will be cancelled and allocated to the next student on the waiting list.

Note: This fee is 100% refundable with your first month stipend.

Regards,
Pooja Sharma
Head - Campus Talent Acquisition
Global Infotech Solutions Pvt Ltd (Fictional)`,
    notes: 'Common Indian student scam indicators: Generic @gmail.com email, demand for ₹1,850 upfront courier fee via UPI / Google Pay, 4-hour artificial urgency countdown, requesting full Aadhaar and PAN cards over WhatsApp, and high stipend with zero technical assessment.'
  },

  indianCredible: {
    id: 'credible-india-1',
    title: 'More Credible Offer (Indian Context)',
    badge: 'Fictional Credible Indian Example',
    badgeType: 'success',
    company: 'Kavach Digital Labs India Pvt Ltd (Fictional)',
    role: 'Summer R&D Software Intern',
    text: `Subject: Formal Internship Offer Letter - Summer 2027 Engineering Internship
From: Kavach Digital University Relations <campus-hiring@kavachdigitallabs.in>
Date: October 18, 2026

Dear Student,

Following your performance in the Campus National Aptitude Test and your technical interview with our Pune R&D Engineering Team on October 12, 2026, we are pleased to offer you an internship at Kavach Digital Labs India Pvt Ltd.

OFFER SPECIFICATIONS:
- Role: Software Engineering Intern (Cybersecurity & Systems)
- Location: Pune / Bengaluru (Hybrid) with college NOC approval
- Duration: 8 weeks (June 1, 2027 to July 25, 2027)
- Monthly Stipend: ₹28,000 per month (Subject to standard statutory deductions)
- Working Hours: Monday to Friday (40 hours per week)

EQUIPMENT & ASSET POLICY:
Kavach Digital Labs provides all necessary workstations, security tokens, and dev environment credentials at ZERO charge to the student. Under our strict policy, Kavach Digital Labs NEVER requests security deposits, courier fees, application processing charges, or any payments via UPI, cash, or third-party links from any student.

ONBOARDING & VERIFICATION PROCESS:
Please review and e-sign this offer letter through our official enterprise career portal at https://careers.kavachdigitallabs.in/portal using your verified applicant reference ID (KDL-2027-IN-4821). Standard document verification (College ID, provisional marksheet) will be conducted exclusively within the portal.

You have until November 10, 2026 to accept this offer.

Sincerely,

Vikramaditya Patil
Head of University Relations
Kavach Digital Labs India Pvt Ltd
campus-hiring@kavachdigitallabs.in
CIN: U72200PN2018PTC176543`,
    notes: 'Standard Indian collegiate recruitment indicators: Verified corporate domain (@kavachdigitallabs.in), corporate identification number (CIN), realistic college intern stipend, company policy covering equipment at zero charge, formal enterprise ATS portal, and generous acceptance window.'
  },

  ambiguous: {
    id: 'ambiguous-sample-1',
    title: 'Ambiguous Offer (Unclear / Mixed Signals)',
    badge: 'Fictional Ambiguous Sample',
    badgeType: 'caution',
    company: 'Nexus Creative Digital (Fictional)',
    role: 'Virtual Content & Marketing Trainee',
    text: `Subject: Invitation to Connect: Virtual Content & Marketing Trainee Opening
From: Talent Coordination <recruitment@nexuscreative-agency.org>
Date: October 24, 2026

Hi Candidate,

We noticed your profile and portfolio while reviewing university project repositories. Our digital campaign group is currently looking for 2-3 motivated student trainees for an upcoming Winter project cycle.

ROLE OVERVIEW:
- Position: Virtual Content & Marketing Trainee (Part-time, 12-16 hrs/week)
- Estimated Pay: $22.00 – $26.00/hour (paid bi-weekly via standard payroll)
- Work Mode: 100% remote with flexible scheduling

We like to move quickly. Would you have 15-20 minutes for an introductory video call or WhatsApp voice chat this Thursday afternoon? To schedule your slot, please reply with an updated resume and your general weekly availability, or message our talent coordinator directly on WhatsApp at +1 (555) 349-2018.

Please note: No security deposits or equipment fees are required at any time. Further project scopes will be shared following our introductory discussion.

Best regards,
Marcus Vance
Talent Operations Team
Nexus Creative Digital (Fictional)`,
    notes: 'An ambiguous recruitment message: Realistic pay rate and explicit disclaimer denying upfront fees, but communication blends an informal WhatsApp chat option alongside an organizational domain (.org rather than commercial enterprise portal), and exact duties remain vaguely defined. Needs independent verification.'
  }
};
