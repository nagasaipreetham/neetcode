import { useState } from 'react';
import { FileText, ChevronRight, ChevronDown } from 'lucide-react';
import Folder from '../Folder/Folder';
import './FileTree.css';

function FileRow({ name, desc, badge, indent = false }) {
  return (
    <div className={`filetree-row ${indent ? 'filetree-row--indent' : ''}`}>
      <div className="filetree-row-left">
        <FileText size={14} className="filetree-file-icon" />
        <span className="filetree-name">{name}</span>
        {badge && <span className="filetree-badge">{badge}</span>}
      </div>
      {desc && <span className="filetree-desc">{desc}</span>}
    </div>
  );
}

function FolderRow({ name, children, color = '#5227FF' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="filetree-folder-block">
      <div className="filetree-row filetree-folder-row" onClick={() => setOpen(v => !v)}>
        <div className="filetree-row-left">
          {/* Mini folder icon wrapper */}
          <div className="filetree-folder-icon-wrap">
            <Folder isOpen={open} size={0.25} color={color} />
          </div>
          <span className="filetree-name filetree-folder-name">{name}/</span>
          {open
            ? <ChevronDown size={13} className="filetree-chevron" />
            : <ChevronRight size={13} className="filetree-chevron" />}
        </div>
      </div>
      {open && (
        <div className="filetree-children">
          {children.map((child, i) => (
            <FileRow key={i} name={child.name} desc={child.desc} indent />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileTree({ tree }) {
  return (
    <div className="filetree-root">
      {tree.map((node, i) =>
        node.type === 'folder'
          ? <FolderRow key={i} name={node.name} children={node.children} />
          : <FileRow   key={i} name={node.name} desc={node.desc} badge={node.badge} />
      )}
    </div>
  );
}
