import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowRight,
  Clock,
  Share2,
  BookOpen,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string | null;
  category: string;
  author_name: string;
  author_avatar: string | null;
  published_at: string | null;
  is_featured: boolean;
  read_time: string;
  created_at: string;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        navigate('/blog');
        toast.error('Artikel tidak ditemukan');
        return;
      }

      setPost(data);
      
      // Fetch related posts from the same category
      const { data: related } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', data.category)
        .neq('id', data.id)
        .limit(3);

      setRelatedPosts(related || []);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Gagal memuat artikel');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link artikel berhasil disalin');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen pt-16">
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }
        .gradient-text {
          background: linear-gradient(45deg, #ef4444, #dc2626, #b91c1c);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
        }
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .prose-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        .prose-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose-content ul, .prose-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .prose-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>

      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={post.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200'} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 smooth-transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Blog
            </Link>
            
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4">
              {post.category}
            </span>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-border mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{post.author_name}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.published_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.read_time}
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Bagikan
            </Button>
          </div>

          {/* Excerpt */}
          <div className="bg-muted/50 rounded-xl p-6 mb-8">
            <p className="text-lg text-muted-foreground italic">
              {post.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose-content text-foreground">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags/Category */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">Kategori:</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-8 text-center">
              Artikel Terkait
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article 
                  key={relatedPost.id}
                  className="group bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover-lift smooth-transition"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={relatedPost.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md">
                        {relatedPost.category}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{relatedPost.read_time}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary smooth-transition">
                      {relatedPost.title}
                    </h3>
                    
                    <Link 
                      to={`/blog/${relatedPost.slug}`}
                      className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 smooth-transition"
                    >
                      Baca Artikel
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ingin Belajar Lebih Lanjut?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Jelajahi kursus-kursus berkualitas kami dan mulai perjalanan belajar Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:scale-105 smooth-transition shadow-lg"
            >
              Lihat Kursus
            </Link>
            <Link
              to="/blog"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 smooth-transition"
            >
              Baca Artikel Lain
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
