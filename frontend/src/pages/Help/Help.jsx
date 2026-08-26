const faqs = [
  ['Where do I watch a movie from?', 'CineClub helps you discover and discuss titles. Use your preferred streaming service to watch them.'],
  ['How do I join a club?', 'Open Clubs, choose a community, and select Join club.'],
  ['How do I log a movie?', 'Open Watched, search for a title, and add it to your personal watch history.'],
  ['Is the website free?', 'CineClub is free to use for discovering titles and joining conversations.'],
];

const Help = () => (
  <section className="page-panel utility-page">
    <p className="eyebrow">Support centre</p>
    <h1>Help &amp; Support</h1>
    <p className="utility-intro">Find quick answers about navigating CineClub and sharing your cinema journey.</p>
    <div className="help-grid">
      <article className="help-card"><strong>Discover</strong><span>Find films, clubs, and people who share your taste.</span></article>
      <article className="help-card"><strong>Community</strong><span>Join conversations and share what you watched.</span></article>
      <article className="help-card"><strong>Profile</strong><span>Manage your identity, watch history, and preferences.</span></article>
    </div>
    <h2 className="utility-subheading">Frequently asked questions</h2>
    <div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </section>
);

export default Help;
