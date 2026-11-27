/*
 * SAARAAZ BEAUTY ACADEMY — central editable site data.
 * Leave a value as an empty string until the real business detail is confirmed.
 * The website reacts gracefully to every empty field.
 */
export const config = {
  brand: 'SAARAAZ BEAUTY ACADEMY',

  /* International format, digits only, country code first, no "+" or spaces.
     Example shape: 9477XXXXXXX. Empty = WhatsApp buttons explain details are coming soon. */
  whatsappNumber: '',

  phone: '',        // e.g. "+94 77 000 0000" as it should be displayed
  email: '',
  location: '',     // full street address; also enables the map link
  mapEmbedUrl: '',  // optional Google Maps embed URL (https://www.google.com/maps/embed?...)
  hours: '',        // e.g. "Tue – Sun, 9.00 – 19.00"

  socials: {
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
  },

  /* Same-origin backend endpoint (e.g. "/api/registrations") that forwards to Google Sheets.
     Must reply with JSON { "success": true }. Empty = applications are NOT submitted or saved. */
  registrationEndpoint: '',
  /* Optional separate endpoint for the contact form, same { "success": true } contract. */
  contactEndpoint: '',

  services: [
    { id: 'hair-styling', name: 'Hair Styling', price: '', image: 'assets/images/hair-styling.jpg',
      alt: 'Illustrative image: stylist creating soft waves with a curling iron',
      description: 'Blow-dries, soft waves, sleek finishes and occasion styling shaped around your face, your hair texture and the moment you are dressing for.' },
    { id: 'hair-cutting', name: 'Hair Cutting', price: '', image: 'assets/images/hair-cutting.jpg',
      alt: 'Illustrative image: precision haircut with scissors and comb',
      description: 'Considered cuts that begin with a conversation — reshaping, refreshing or a complete change, finished so it falls well long after you leave.' },
    { id: 'hair-treatments', name: 'Hair Treatments', price: '', image: 'assets/images/hair-treatment.jpg',
      alt: 'Illustrative image: nourishing mask brushed through long dark hair',
      description: 'Restorative care for hair that feels tired, dry or stressed — chosen after a look at your hair’s condition, never a one-size routine.' },
    { id: 'bridal-dressing', name: 'Bridal Dressing', price: '', image: 'assets/images/bridal.jpg',
      alt: 'Illustrative image: bride with gold jewellery and refined bridal makeup',
      description: 'Hair, makeup and dressing for the bride, planned in advance so the day itself feels calm, unhurried and entirely yours.' },
    { id: 'professional-makeup', name: 'Professional Makeup', price: '', image: 'assets/images/makeup.jpg',
      alt: 'Illustrative image: makeup artist applying eyeshadow with a brush',
      description: 'Makeup for events, celebrations and photographs — luminous, balanced and built to last through the evening.' },
    { id: 'beauty-treatments', name: 'Beauty Treatments', price: '', image: 'assets/images/beauty-treatment.jpg',
      alt: 'Illustrative image: calm facial skincare treatment',
      description: 'Skin and beauty care in a quiet setting — time set aside to be looked after properly. Ask us which treatments suit you.' },
  ],

  courses: [
    { id: 'professional-hair-dressing', name: 'Professional Hair Dressing', duration: '', fee: '', image: 'assets/images/training.jpg',
      alt: 'Illustrative image: students practising hairstyling on training heads',
      description: 'A grounding in professional hairdressing for those who want to work with hair seriously.',
      learn: ['Hair and scalp fundamentals', 'Salon hygiene and client consultation', 'Core dressing and finishing techniques', 'Working with different hair textures'],
      forWhom: 'Beginners and aspiring salon professionals.' },
    { id: 'hair-cutting-styling', name: 'Hair Cutting & Styling', duration: '', fee: '', image: 'assets/images/hair-cutting.jpg',
      alt: 'Illustrative image: scissors cutting glossy dark hair',
      description: 'Cutting structure and styling finish, practised until your hands understand both.',
      learn: ['Sectioning and cutting principles', 'Tool handling and safety', 'Blow-drying and heat styling', 'Finishing for different face shapes'],
      forWhom: 'Learners wanting a cutting and styling focus.' },
    { id: 'bridal-dressing-course', name: 'Bridal Dressing', duration: '', fee: '', image: 'assets/images/bridal.jpg',
      alt: 'Illustrative image: bride in gold jewellery',
      description: 'The craft of preparing a bride — hair, makeup, dressing and the calm that holds the day together.',
      learn: ['Bridal consultation and planning', 'Bridal hair and dressing', 'Long-wear bridal makeup', 'Timing and working on the day'],
      forWhom: 'Artists who want to work with brides.' },
    { id: 'professional-makeup-course', name: 'Professional Makeup', duration: '', fee: '', image: 'assets/images/makeup.jpg',
      alt: 'Illustrative image: makeup artist at work',
      description: 'Makeup artistry from skin preparation through to finished looks for events and camera.',
      learn: ['Skin preparation and complexion', 'Colour, contour and eyes', 'Event and photographic makeup', 'Kit hygiene and professional practice'],
      forWhom: 'Beginners and those building a makeup career.' },
    { id: 'beauty-therapy', name: 'Beauty Therapy', duration: '', fee: '', image: 'assets/images/beauty-treatment.jpg',
      alt: 'Illustrative image: skincare treatment in a calm room',
      description: 'Foundations of beauty therapy and client care in a professional setting.',
      learn: ['Skin types and analysis', 'Treatment preparation and hygiene', 'Client comfort and aftercare', 'Professional conduct'],
      forWhom: 'Learners interested in skin and beauty care.' },
  ],

  gallery: [
    { src: 'assets/images/salon.jpg', cat: 'salon', caption: 'Salon atmosphere', alt: 'Illustrative image: elegant salon with gold mirrors and black stations' },
    { src: 'assets/images/training.jpg', cat: 'training', caption: 'Hands-on practice', alt: 'Illustrative image: students practising on training heads' },
    { src: 'assets/images/bridal.jpg', cat: 'bridal', caption: 'Bridal preparation', alt: 'Illustrative image: bride with gold jewellery' },
    { src: 'assets/images/hair-styling.jpg', cat: 'hair', caption: 'Soft waves', alt: 'Illustrative image: curling iron shaping waves' },
    { src: 'assets/images/makeup.jpg', cat: 'bridal', caption: 'Makeup artistry', alt: 'Illustrative image: eyeshadow application' },
    { src: 'assets/images/hair-cutting.jpg', cat: 'hair', caption: 'Precision cutting', alt: 'Illustrative image: scissors cutting hair' },
    { src: 'assets/images/hair-treatment.jpg', cat: 'hair', caption: 'Hair care ritual', alt: 'Illustrative image: hair mask application' },
    { src: 'assets/images/beauty-treatment.jpg', cat: 'salon', caption: 'Quiet treatment room', alt: 'Illustrative image: facial treatment' },
  ],
};
