import { useEffect, useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type ResultRow = {
  id: string;
  year: string;
  label: string;
  pdf_path: string | null;
  uploaded_at: string | null;
};

export function AdminResultsPanel() {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingYear, setUploadingYear] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('championship_results').select('*').order('year');
    setResults(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (year: string, file: File) => {
    setMessage(null);
    setUploadingYear(year);

    const path = `${year}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from('results')
      .upload(path, file, { upsert: true, contentType: 'application/pdf' });

    if (uploadError) {
      setMessage({ type: 'error', text: uploadError.message });
      setUploadingYear(null);
      return;
    }

    const { error: dbError } = await supabase
      .from('championship_results')
      .update({ pdf_path: path, uploaded_at: new Date().toISOString() })
      .eq('year', year);

    setUploadingYear(null);

    if (dbError) {
      setMessage({ type: 'error', text: dbError.message });
      return;
    }

    setMessage({ type: 'success', text: `Results PDF for ${year} uploaded successfully.` });
    load();
  };

  return (
    <div className="mt-16">
      <div
        className="text-foreground uppercase mb-5"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '18px', fontWeight: 800, letterSpacing: '0.06em' }}
      >
        Championship Results (PDF)
      </div>

      {message && (
        <div
          className={`flex items-start gap-2 mb-4 ${message.type === 'success' ? 'text-green-600' : 'text-destructive'}`}
          style={{ fontSize: '13px' }}
        >
          {message.type === 'success' ? <CheckCircle2 size={15} className="shrink-0 mt-0.5" /> : <AlertCircle size={15} className="shrink-0 mt-0.5" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="border border-border bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground" style={{ fontSize: '13px' }}>Loading…</div>
        ) : (
          <div className="flex flex-col divide-y divide-border">
            {results.map((r) => (
              <div key={r.id} className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <FileText size={18} className={r.pdf_path ? 'text-primary' : 'text-muted-foreground'} />
                  <div>
                    <div className="text-foreground" style={{ fontSize: '14px', fontWeight: 600 }}>{r.label}</div>
                    <div className="text-muted-foreground" style={{ fontSize: '12px' }}>
                      {r.pdf_path
                        ? `Uploaded ${new Date(r.uploaded_at!).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`
                        : 'No PDF uploaded yet'}
                    </div>
                  </div>
                </div>
                <label
                  className="flex items-center gap-2 border border-border px-4 py-2 text-muted-foreground hover:text-foreground hover:border-primary transition-colors cursor-pointer"
                  style={{ fontSize: '12px', fontWeight: 600 }}
                >
                  <Upload size={14} />
                  {uploadingYear === r.year ? 'Uploading…' : r.pdf_path ? 'Replace PDF' : 'Upload PDF'}
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    disabled={uploadingYear === r.year}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(r.year, file);
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}