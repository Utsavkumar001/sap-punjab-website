import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('General Enquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[SAP Website] ${reason} — ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nReason: ${reason}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:pnbsepaktakraw@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="bg-background min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
              Get In Touch
            </span>
          </div>
          <h1
            className="text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}
          >
            Contact &amp; Register
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl" style={{ fontSize: '15px', lineHeight: 1.7 }}>
            Reach out to register your club or athlete, ask about upcoming events, or get in touch with the
            Sepaktakraw Association of Punjab.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="border border-border bg-card p-8">
              <div
                className="text-foreground uppercase mb-5 pb-3 border-b border-border"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '14px', fontWeight: 800, letterSpacing: '0.12em' }}
              >
                Contact SAP
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-3">
                  <MapPin size={17} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: 1.7 }}>
                    Sepaktakraw Association of Punjab<br />
                    Flat No. 29, 1st Floor, Shri Devaji Residency,<br />
                    Kishanpura Road, Dhakoli, Zirakpur, Punjab — 160104
                  </span>
                </div>
                <a
                  href="tel:+917607908528"
                  className="flex gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={17} className="text-primary shrink-0 mt-0.5" />
                  <span style={{ fontSize: '14px' }}>+91 76079 08528</span>
                </a>
                <a
                  href="mailto:pnbsepaktakraw@gmail.com"
                  className="flex gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={17} className="text-primary shrink-0 mt-0.5" />
                  <span style={{ fontSize: '14px' }}>pnbsepaktakraw@gmail.com</span>
                </a>
              </div>
            </div>

            <div
              className="p-6"
              style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.07) 0%, rgba(109,40,217,0.03) 100%)', border: '1px solid rgba(109,40,217,0.18)' }}
            >
              <div
                className="text-foreground mb-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}
              >
                Registering a Club or Athlete?
              </div>
              <p className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: 1.6 }}>
                Use the form and select "Club / Athlete Registration" as your reason for contacting us —
                we'll follow up with the registration process.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="border border-border bg-card p-8 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                    style={{ fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Reason for Contacting
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  style={{ fontSize: '14px' }}
                >
                  <option>General Enquiry</option>
                  <option>Club / Athlete Registration</option>
                  <option>Championship / Event Information</option>
                  <option>Media &amp; Press</option>
                  <option>Coaching Workshop</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground mb-2 uppercase" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  style={{ fontSize: '14px' }}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 w-full hover:bg-primary/90 transition-colors uppercase"
                style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em' }}
              >
                Send Message <Send size={15} />
              </button>
              <p className="text-muted-foreground text-center" style={{ fontSize: '12px' }}>
                This opens your email app with the message pre-filled, addressed to SAP.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}