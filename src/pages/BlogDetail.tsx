import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = post ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) : [];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: post?.title, text: post?.excerpt, url: window.location.href }); } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link artikel berhasil disalin');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">Artikel tidak ditemukan</p>
          <Link to="/blog" className="text-primary hover:underline">Kembali ke Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <style>{`
        .hero-gradient { background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); }
        .gradient-text { background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15); }
        .smooth-transition { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .prose-content p { margin-bottom: 1.5rem; line-height: 1.8; }
      `}</style>

      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={post.thumbnail_url} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 smooth-transition"><ArrowLeft className="w-4 h-4" />Kembali ke Blog</Link>
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4">{post.category}</span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          </div>
        </div>
      </div>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"><User className="w-6 h-6 text-primary" /></div>
              <div>
                <p className="font-semibold">{post.author_name}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(post.published_at)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.read_time}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2"><Share2 className="w-4 h-4" />Bagikan</Button>
          </div>
          <div className="bg-muted/50 rounded-xl p-6 mb-8"><p className="text-lg text-muted-foreground italic">{post.excerpt}</p></div>
          <div className="prose-content text-foreground">
            {post.content.split('\n\n').map((paragraph, index) => (<p key={index} className="text-lg">{paragraph}</p>))}
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-muted-foreground" /><span className="text-muted-foreground">Kategori:</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">{post.category}</span>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-8 text-center">Artikel Terkait</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp) => (
                <article key={rp.id} className="group bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover-lift smooth-transition">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={rp.thumbnail_url} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 smooth-transition" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md">{rp.category}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{rp.read_time}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-primary smooth-transition">{rp.title}</h3>
                    <Link to={`/blog/${rp.slug}`} className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 smooth-transition">
                      Baca Artikel<ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ingin Belajar Lebih Lanjut?</h2>
          <p className="text-lg text-white/90 mb-8">Jelajahi kursus-kursus berkualitas kami dan mulai perjalanan belajar Anda.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:scale-105 smooth-transition shadow-lg">Lihat Kursus</Link>
            <Link to="/blog" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 smooth-transition">Baca Artikel Lain</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
