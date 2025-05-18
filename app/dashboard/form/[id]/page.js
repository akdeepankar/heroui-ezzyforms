'use client'
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCurrentUser, databases } from '@/lib/appwrite';

export default function FormDetails() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editElements, setEditElements] = useState([]);
  const [editSettings, setEditSettings] = useState({});
  const [editHeaderImage, setEditHeaderImage] = useState('');
  const [showPublish, setShowPublish] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    getCurrentUser().then(u => {
      if (!u) {
        router.replace('/');
      } else {
        setUser(u);
        // Fetch form by ID
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID;
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_FORMS_COLLECTION_ID;
        databases.getDocument(databaseId, collectionId, id)
          .then(doc => {
            if (doc.userId !== u.$id) {
              setError('You are not authorized to view this form.');
              setLoading(false);
              setTimeout(() => router.replace('/dashboard'), 2000);
            } else {
              setForm(doc);
              setEditName(doc.name);
              setEditDescription(doc.description);
              setEditElements(doc.elements ? JSON.parse(doc.elements) : []);
              setEditSettings(doc.settings ? JSON.parse(doc.settings) : {});
              setEditHeaderImage(doc.headerImage || '');
              setLoading(false);
            }
          })
          .catch(() => {
            setError('Form not found.');
            setLoading(false);
            setTimeout(() => router.replace('/dashboard'), 2000);
          });
      }
    });
  }, [id, router]);

  const handleSave = async () => {
    setSaveStatus('');
    if (!editName.trim() || !editDescription.trim() || !editElements.length) {
      setSaveStatus('error');
      return;
    }
    try {
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID;
      const collectionId = process.env.NEXT_PUBLIC_APPWRITE_FORMS_COLLECTION_ID;
      await databases.updateDocument(databaseId, collectionId, id, {
        name: editName,
        description: editDescription,
        elements: JSON.stringify(editElements),
        settings: JSON.stringify(editSettings),
        ...(editHeaderImage ? { headerImage: editHeaderImage } : {}),
      });
      setSaveStatus('success');
    } catch (e) {
      setSaveStatus('error');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto bg-white/5 rounded-2xl p-8 border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Edit Form</h1>
        <label className="block mb-2">Form Name</label>
        <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full mb-4 p-2 rounded bg-white/10 text-white" />
        <label className="block mb-2">Description</label>
        <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} className="w-full mb-4 p-2 rounded bg-white/10 text-white" />
        {/* Elements list (simple view) */}
        <h2 className="text-xl font-semibold mb-2">Form Elements</h2>
        <div className="space-y-2 mb-4">
          {editElements.length === 0 && <div className="text-gray-400">No elements in this form.</div>}
          {editElements.map((el, idx) => (
            <div key={idx} className="p-2 bg-white/10 rounded flex items-center justify-between">
              <div>
                <input value={el.label || ''} onChange={e => {
                  const newEls = [...editElements];
                  newEls[idx].label = e.target.value;
                  setEditElements(newEls);
                }} className="bg-transparent text-white border-b border-white/20 focus:outline-none mr-2" />
                <span className="text-gray-400 text-xs ml-2">({el.type})</span>
              </div>
            </div>
          ))}
        </div>
        {/* Save and Publish buttons */}
        <div className="flex gap-4 mt-6">
          <button onClick={handleSave} className="px-6 py-2 bg-cyan-500 rounded text-white font-semibold hover:bg-cyan-600">Save</button>
          <button onClick={() => setShowPublish(true)} className="px-6 py-2 bg-green-500 rounded text-white font-semibold hover:bg-green-600">Publish</button>
        </div>
        {saveStatus === 'success' && <div className="mt-4 text-green-400">Form saved!</div>}
        {saveStatus === 'error' && <div className="mt-4 text-red-400">Please fill all fields and add at least one element.</div>}
        {/* Publish Modal */}
        {showPublish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowPublish(false)}>
            <div className="bg-white text-black rounded-xl p-8 shadow-lg max-w-md w-full text-center" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-4">Share this link to publish your form:</h2>
              <div className="bg-gray-100 rounded p-2 mb-4 break-all">{`${window.location.origin}/forms/${id}`}</div>
              <button className="px-4 py-2 bg-cyan-500 text-white rounded" onClick={() => {navigator.clipboard.writeText(`${window.location.origin}/forms/${id}`)}}>Copy Link</button>
              <button className="ml-4 px-4 py-2 bg-gray-300 text-black rounded" onClick={() => setShowPublish(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 