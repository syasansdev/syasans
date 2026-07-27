export type Testimonial = {
  quote: string;
  author: string;
};

/**
 * Shared by the homepage testimonial band and the Feedback page, so the two
 * can never drift apart.
 *
 * The per-item `gradient` string the previous version carried has been
 * dropped: thirty-one different avatar gradients is decoration, not
 * information, and it was the single largest source of colour noise on the
 * page. Avatars now derive their tint from the design system instead.
 */
export const testimonials: readonly Testimonial[] = [
  { quote: "Excellent placement-oriented training with practical learning methods and highly supportive mentors.", author: "Aadhitya" },
  { quote: "Highly specialized curriculum with regular assessments and outstanding trainer support.", author: "Sangar Vishal" },
  { quote: "Expert trainers with excellent subject knowledge and student-friendly mentoring.", author: "Hilary Royson" },
  { quote: "The sessions were highly engaging, interactive, and professionally delivered.", author: "Asma Farzana" },
  { quote: "Very clear explanations with excellent support throughout the training program.", author: "Pooja R" },
  { quote: "Unique teaching methodology with strong practical exposure and motivation.", author: "Parveen" },
  { quote: "Well-structured aptitude training with highly knowledgeable instructors.", author: "Captain Cool" },
  { quote: "Professional mentoring and valuable career guidance helped improve my confidence.", author: "Pushparaj Jack" },
  { quote: "Excellent trainer performance with highly professional delivery methods.", author: "Ragav Kumar" },
  { quote: "Valuable placement guidance and excellent learning support throughout the sessions.", author: "Nandhini Arul" },
  { quote: "The training improved my interview confidence and communication skills significantly.", author: "Dineshwari Venkatasubramani" },
  { quote: "Quality training sessions with excellent personal mentoring support.", author: "Snekan" },
  { quote: "Highly specialized coaching with strong placement-focused training methods.", author: "Aysha Zain" },
  { quote: "Very useful sessions for improving technical and communication skills.", author: "Muthu Selvi K" },
  { quote: "Excellent mentoring environment focused on career growth and industry readiness.", author: "Joel Jashwa L.A" },
  { quote: "Interactive learning methodology with strong practical implementation.", author: "Harish Kumar" },
  { quote: "Regular mock tests and assessments improved our placement confidence.", author: "Keerthana S" },
  { quote: "Excellent integration of aptitude, coding, and communication training.", author: "Mohammed Rizwan" },
  { quote: "Motivating trainers with highly engaging classroom sessions and activities.", author: "Deepika R" },
  { quote: "Professional training ecosystem with structured learning and evaluation.", author: "Santhosh Kumar" },
  { quote: "Real-time examples made difficult concepts easy to understand.", author: "Pavithra M" },
  { quote: "The program enhanced my aptitude and interview preparation skills greatly.", author: "Aravind Raj" },
  { quote: "Interactive classroom sessions with excellent trainer-student engagement.", author: "Dharshini K" },
  { quote: "One of the best placement training experiences with strong career guidance.", author: "Naveen" },
  { quote: "Excellent training environment with strong focus on placements, discipline, and technical development.", author: "Vishnu Priyan" },
  { quote: "The trainers explained concepts in a simple and practical manner which made learning easy.", author: "Gayathri Devi" },
  { quote: "Highly effective aptitude and coding sessions with continuous motivation from the mentors.", author: "Rohith Krishna" },
  { quote: "The program helped me improve my communication, confidence, and interview performance.", author: "Monisha R" },
  { quote: "Very professional training approach with real-time examples and industry-oriented teaching.", author: "Siva Balaji" },
  { quote: "Supportive trainers and well-structured sessions helped us prepare confidently for placements.", author: "Harini Prakash" },
  { quote: "One of the most useful placement training programs with excellent mentoring and guidance.", author: "Karthik Raman" },
];

/** Splits the set into N balanced marquee rows. */
export const toRows = (items: readonly Testimonial[], rows: number): Testimonial[][] => {
  const perRow = Math.ceil(items.length / rows);
  return Array.from({ length: rows }, (_, index) =>
    items.slice(index * perRow, (index + 1) * perRow),
  );
};
