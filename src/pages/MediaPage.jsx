import React, { useState } from 'react';
import { BookOpen, Headphones, Award, Clock, Play, X } from 'lucide-react';
import { BLOG_POSTS, PODCAST_EPISODES, PRESS_FEATURES } from '../data/articles';

export default function MediaPage({ initialTab = 'blog', onNavigate }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'blog');
  const [readingArticle, setReadingArticle] = useState(null);
  const [activeEpisode, setActiveEpisode] = useState(null);

  return (
    <div className="media-page">
      
      {/* Hero Section */}
      <section className="media-hero">
        <div className="media-hero-overlay" />
        <div className="media-hero-content">
          <span className="media-eyebrow">The Olfactory Journal & Media Hub</span>
          <h1 className="media-title">Scent Journal & Podcast</h1>
          <p className="media-tagline">
            Explore the art and science of natural fragrance, interior atmosphere design, candle care tips, and candid conversations on our "Behind the Flame" podcast.
          </p>
        </div>
      </section>

      {/* Media Navigation Tabs */}
      <div className="media-tabs-bar">
        <div className="media-tabs-container">
          <button 
            className={`media-tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => setActiveTab('blog')}
          >
            <BookOpen size={16} />
            <span>Scent Journal (Blog)</span>
          </button>
          
          <button 
            className={`media-tab-btn ${activeTab === 'podcast' ? 'active' : ''}`}
            onClick={() => setActiveTab('podcast')}
          >
            <Headphones size={16} />
            <span>"Behind The Flame" Podcast</span>
          </button>
          
          <button 
            className={`media-tab-btn ${activeTab === 'press' ? 'active' : ''}`}
            onClick={() => setActiveTab('press')}
          >
            <Award size={16} />
            <span>Press & Accolades</span>
          </button>
        </div>
      </div>

      <div className="media-content-container">
        
        {/* TAB 1: BLOG POSTS */}
        {activeTab === 'blog' && (
          <div className="blog-tab-content">
            
            <div className="blog-featured-banner" onClick={() => setReadingArticle(BLOG_POSTS[0])}>
              <img src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} className="featured-blog-img" />
              <div className="featured-blog-overlay" />
              <div className="featured-blog-info">
                <span className="featured-tag">Featured Editorial &bull; {BLOG_POSTS[0].category}</span>
                <h2 className="featured-blog-title">{BLOG_POSTS[0].title}</h2>
                <p className="featured-blog-summary">{BLOG_POSTS[0].summary}</p>
                <div className="featured-meta-row">
                  <span>By {BLOG_POSTS[0].author}</span>
                  <span>&bull;</span>
                  <span>{BLOG_POSTS[0].readTime}</span>
                </div>
                <button className="btn-luxury-cta read-btn">
                  Read Article &rarr;
                </button>
              </div>
            </div>

            <div className="section-intro" style={{ marginTop: '50px' }}>
              <span className="section-eyebrow">Recent Articles</span>
              <h2 className="section-title text-left">The Scent Library</h2>
            </div>

            <div className="blog-grid">
              {BLOG_POSTS.map((post) => (
                <div 
                  key={post.id} 
                  className="blog-card"
                  onClick={() => setReadingArticle(post)}
                >
                  <div className="blog-card-img-wrap">
                    <img src={post.image} alt={post.title} className="blog-card-img" />
                    <span className="blog-card-cat">{post.category}</span>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span><Clock size={12} /> {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-summary">{post.summary}</p>
                    <span className="blog-read-more">Read Full Story &rarr;</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: PODCAST EPISODES */}
        {activeTab === 'podcast' && (
          <div className="podcast-tab-content">
            <div className="podcast-intro-card">
              <div className="podcast-badge">Official Audio Series</div>
              <h2 className="podcast-series-title">Behind the Flame: Conversations on Scent & Soul</h2>
              <p className="podcast-series-desc">
                Presented by Annette Pure Atelier. An intimate audio podcast diving into the psychology of memory, olfactory craftsmanship, non-toxic living, and building an artisan business.
              </p>
            </div>

            <div className="podcast-episodes-list">
              {PODCAST_EPISODES.map((ep) => (
                <div className="podcast-card" key={ep.id}>
                  <div className="podcast-img-wrap" onClick={() => setActiveEpisode(ep)}>
                    <img src={ep.thumbnail} alt={ep.title} className="podcast-img" />
                    <button className="podcast-play-overlay-btn" aria-label="Play episode">
                      <Play size={20} fill="#FFF" color="#FFF" />
                    </button>
                  </div>
                  <div className="podcast-info">
                    <div className="podcast-meta-row">
                      <span className="ep-duration"><Clock size={13} /> {ep.duration}</span>
                      <span>&bull;</span>
                      <span className="ep-date">{ep.date}</span>
                    </div>
                    <h3 className="podcast-title" onClick={() => setActiveEpisode(ep)}>{ep.title}</h3>
                    <span className="podcast-host">{ep.host}</span>
                    <p className="podcast-desc">{ep.description}</p>
                    
                    <div className="podcast-actions">
                      <button 
                        className="btn-luxe btn-solid podcast-listen-btn"
                        onClick={() => setActiveEpisode(ep)}
                      >
                        <Play size={14} fill="currentColor" />
                        <span>Listen to Episode ({ep.duration})</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRESS & FEATURES */}
        {activeTab === 'press' && (
          <div className="press-tab-content">
            <div className="section-intro">
              <span className="section-eyebrow">Critical Praise</span>
              <h2 className="section-title">In the Press</h2>
            </div>

            <div className="press-grid">
              {PRESS_FEATURES.map((item, idx) => (
                <div className="press-quote-card" key={idx}>
                  <span className="press-outlet-title">{item.outlet}</span>
                  <blockquote className="press-quote">
                    "{item.quote}"
                  </blockquote>
                  <div className="press-card-footer">
                    <span className="press-article-name">{item.articleTitle}</span>
                    <span className="press-year">{item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      {readingArticle && (
        <div className="modal-wrapper active" onClick={() => setReadingArticle(null)}>
          <div className="modal-content article-reader-modal" onClick={(e) => e.stopPropagation()}>
            <button className="qv-close-btn" onClick={() => setReadingArticle(null)}>
              <X size={18} />
            </button>
            
            <div className="reader-hero-img-wrap">
              <img src={readingArticle.image} alt={readingArticle.title} className="reader-hero-img" />
              <div className="reader-hero-badge">{readingArticle.category}</div>
            </div>

            <div className="reader-body">
              <span className="reader-meta">{readingArticle.date} &bull; {readingArticle.readTime} &bull; By {readingArticle.author}</span>
              <h1 className="reader-title">{readingArticle.title}</h1>
              
              <div className="reader-markdown">
                {readingArticle.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.trim().startsWith('###')) {
                    return <h3 key={pIdx} className="reader-subheading">{paragraph.replace('###', '').trim()}</h3>;
                  }
                  return <p key={pIdx} className="reader-p">{paragraph.trim()}</p>;
                })}
              </div>

              <div className="reader-footer-actions">
                <button className="btn-luxury-cta" onClick={() => setReadingArticle(null)}>
                  Back to All Articles
                </button>
                <button 
                  className="btn-luxury-outline"
                  onClick={() => {
                    setReadingArticle(null);
                    if (onNavigate) onNavigate('shop');
                  }}
                >
                  Shop Featured Candles &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Podcast Audio Simulation Player Modal */}
      {activeEpisode && (
        <div className="modal-wrapper active" onClick={() => setActiveEpisode(null)}>
          <div className="modal-content podcast-player-modal" onClick={(e) => e.stopPropagation()}>
            <button className="qv-close-btn" onClick={() => setActiveEpisode(null)}>
              <X size={18} />
            </button>
            
            <div className="player-modal-content">
              <img src={activeEpisode.thumbnail} alt={activeEpisode.title} className="player-thumb" />
              <span className="player-show-name">Behind the Flame &bull; Episode Playback</span>
              <h3 className="player-ep-title">{activeEpisode.title}</h3>
              <p className="player-ep-host">{activeEpisode.host}</p>

              {/* Simulated Audio Track Bar */}
              <div className="audio-track-sim">
                <div className="audio-progress-bar" style={{ width: '45%' }} />
              </div>
              <div className="audio-time-row">
                <span>16:20</span>
                <span>{activeEpisode.duration}</span>
              </div>

              <p className="player-description">{activeEpisode.description}</p>
              
              <button className="btn-luxury-cta" onClick={() => setActiveEpisode(null)}>
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
