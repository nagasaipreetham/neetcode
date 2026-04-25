import React from 'react';
import { Bot, Plus, History, Maximize, ChevronLeft, Grid, X, ArrowUp, Lock, Sparkles } from 'lucide-react';
import './NeetBotPanel.css';

export default function NeetBotPanel({ onClose }) {
  return (
    <div className="neetbot-panel">
      {/* Header */}
      <div className="neetbot-header">
        <div className="neetbot-header-left">
          <div className="neetbot-title">
            <Bot size={16} />
            <span>NeetBot</span>
          </div>
          <div className="neetbot-badge">4 left</div>
        </div>
        <div className="neetbot-header-right">
          <button className="icon-btn" title="New Chat"><Plus size={16} /></button>
          <button className="icon-btn" title="History"><History size={16} /></button>
          <button className="icon-btn" title="Maximize"><Maximize size={16} /></button>
          <button className="icon-btn" title="Collapse"><ChevronLeft size={16} /></button>
          <button className="icon-btn" title="Apps"><Grid size={16} /></button>
          <button className="icon-btn close-btn" title="Close" onClick={onClose}><X size={16} /></button>
        </div>
      </div>

      {/* Main Content */}
      <div className="neetbot-content">
        <div className="neetbot-hero">
          <div className="neetbot-logo-lg">
            <Bot size={32} />
          </div>
          <h2>NeetBot</h2>
          <p>Your personal coding assistant</p>
        </div>

        <div className="neetbot-presets">
          <button className="preset-btn explain-btn">
            <span>Explain this problem</span>
          </button>
          <button className="preset-btn approach-btn">
            <span>Suggest an approach</span>
          </button>
          <button className="preset-btn complexity-btn">
            <span>Time & space complexity</span>
          </button>
        </div>
      </div>

      {/* Footer / Input */}
      <div className="neetbot-footer">
        <div className="neetbot-input-container">
          <textarea
            className="neetbot-input"
            placeholder="Ask NeetBot anything..."
            rows={1}
          />
          <button className="neetbot-send-btn">
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="neetbot-models-row">
          <button className="model-chip active">
            <Bot size={12} />
            <span>ChatGPT</span>
          </button>
          <button className="model-chip locked">
            <Sparkles size={12} />
            <span>Gemini</span>
            <Lock size={10} className="lock-icon" />
          </button>
          <button className="model-chip locked">
            <Sparkles size={12} />
            <span>Claude</span>
            <Lock size={10} className="lock-icon" />
          </button>
          <button className="model-chip locked">
            <Bot size={12} />
            <span>DeepSeek</span>
            <Lock size={10} className="lock-icon" />
          </button>
        </div>

        <div className="neetbot-footer-hint">
          Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
