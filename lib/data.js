export const FEATURED_WORK = [
  { num: '01', title: 'The Bridal Crown', desc: 'A refined finishing statement for the bride who wants presence without excess.', grad: 'linear-gradient(200deg,#3a2a1c,#15100c)', line: '#caa877', sym: 'fold-a' },
  { num: '02', title: 'The Royal Fold', desc: 'Architectural, high and unmistakably regal. Our most requested signature shape.', grad: 'linear-gradient(200deg,#5c2231,#2b2018)', line: '#d7ab6e', sym: 'fold-b' },
  { num: '03', title: 'The Statement', desc: 'Bold volume and colour play, built for a moment that should not be missed.', grad: 'linear-gradient(200deg,#a6522e,#15100c)', line: '#f2e9d8', sym: 'fold-c' },
  { num: '04', title: 'The Editorial', desc: 'Sculptural and campaign ready, for photography that needs to hold a frame.', grad: 'linear-gradient(200deg,#8a6b45,#2b2018)', line: '#f2e9d8', sym: 'fold-a' },
];

export const SERVICES = [
  { tag: 'Bridal', title: 'Bridal Gele', desc: 'For brides who want an unforgettable finishing statement.', grad: 'linear-gradient(200deg,#3a2a1c,#15100c)', line: '#caa877', sym: 'fold-a', img: '/images/gele-pink-dramatic-2.jpg' },
  { tag: 'Heritage', title: 'Traditional Ceremonies', desc: 'Beautiful gele styling for cultural celebrations.', grad: 'linear-gradient(200deg,#5c2231,#2b2018)', line: '#d7ab6e', sym: 'fold-b', img: '/images/gele-blue-asooke-1.jpg' },
  { tag: 'Celebration', title: 'Special Occasions', desc: 'Birthdays, parties and milestone moments.', grad: 'linear-gradient(200deg,#a6522e,#15100c)', line: '#f2e9d8', sym: 'fold-c', img: '/images/gele-peach-2.jpg' },
  { tag: 'Editorial', title: 'Photoshoots', desc: 'Editorial and creative styling built for the camera.', grad: 'linear-gradient(200deg,#8a6b45,#15100c)', line: '#f2e9d8', sym: 'fold-a', img: '/images/gele-silver-editorial-4.jpg' },
  { tag: 'Corporate', title: 'Corporate Workshops', desc: 'Team-building and culture events, gele styling and tying sessions for offices and organisations.', grad: 'linear-gradient(200deg,#2b2018,#15100c)', line: '#dac49c', sym: 'fold-b', img: '/images/gele-white-beaded-1.jpg' },
];

export const PROCESS = [
  { num: '01', title: 'Consult', body: 'We discover your vision, your event and the story you want your look to tell.' },
  { num: '02', title: 'Prepare', body: 'We consider your outfit, event, face shape and desired aesthetic in detail.' },
  { num: '03', title: 'Create', body: 'Your gele is carefully sculpted, folded and perfected by hand.' },
  { num: '04', title: 'Crown', body: 'You step into your moment, ready and unforgettable.' },
];

export const TESTIMONIALS = [
  { quote: 'She completely transformed my look. The gele was the final piece that made everything come together.', who: 'Bridal Client, London', img: '/images/gele-pink-beaded-3.jpg', alt: 'Client in a beaded pink gown and matching gele' },
  { quote: 'Every fold was so precise. I felt like I was wearing a piece of art, not just fabric.', who: 'Traditional Ceremony Client', img: '/images/gele-silver-editorial-5.jpg', alt: 'Client in a silver editorial gele and gown' },
  { quote: 'Effortless from the first message to the final touch. I have never felt more put together.', who: 'Corporate Workshop Client, London', img: '/images/gele-peach-1.jpg', alt: 'Client in a peach gele and matching gown' },
];

export const INSTAGRAM = [
  { img: '/images/insta-mint-veil.jpg', alt: 'Client in a mint green traditional look with matching gele and veil' },
  { img: '/images/insta-podcast.jpg', alt: 'Gele Glamzzz styling featured on a podcast appearance' },
  { img: '/images/insta-glam-gold.jpg', alt: 'Client in a gold and yellow patterned gele' },
  { img: '/images/insta-mint-pose.jpg', alt: 'Client in a mint green traditional look with matching gele' },
  { img: '/images/insta-glam-white.jpg', alt: 'Client in a white gele with beaded gold-fringe gown' },
];

/* Journal, reimagined as a pictures + video feed.
   TODO(video): each { type:'video' } entry below has no `src` yet — drop an
   .mp4 file into /public/videos/ and set its src (see JournalScripts.js,
   nothing else needs to change; it autoplays muted, looped, no controls). */
export const JOURNAL_MEDIA = [
  { type: 'video', src: '', poster: '/images/gele-pink-dramatic-1.jpg', caption: 'The Full Look', sub: 'Video', wide: true, suggest: 'journal-full-look.mp4' },
  { type: 'image', src: '/images/gele-pink-beaded-2.jpg', caption: 'The Beaded Fold', sub: 'Bridal' },
  { type: 'image', src: '/images/gele-silver-editorial-3.jpg', caption: 'The Silver Fold', sub: 'Editorial' },
  { type: 'video', src: '', poster: '/images/gele-silver-editorial-2.jpg', caption: 'Behind the Fold', sub: 'Video', suggest: 'journal-behind-the-fold.mp4' },
  { type: 'image', src: '/images/vogue-backstage.jpg', caption: 'Backstage, Fashion Week', sub: 'Runway' },
  { type: 'image', src: '/images/gele-silver-editorial-1.jpg', caption: 'Texture Study', sub: 'Detail' },
  { type: 'video', src: '', poster: '/images/gele-pink-beaded-1.jpg', caption: 'A Client Reveal', sub: 'Video', suggest: 'journal-reveal.mp4' },
  { type: 'image', src: '/images/gele-blue-asooke-2.jpg', caption: 'Aso-Oke Edit', sub: 'London', wide: true },
  { type: 'image', src: '/images/gele-white-beaded-2.jpg', caption: 'Hand-Finished Detail', sub: 'Bridal' },
];
