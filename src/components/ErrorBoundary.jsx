import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto my-12 p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-red-500/40 text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 mx-auto flex items-center justify-center border border-red-500/30">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Xatolik yuz berdi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Diagnostika natijalarini ko'rsatishda kutilmagan texnik muammo yuzaga keldi. Xavotir olmang, ma'lumotlaringiz saqlangan.
          </p>
          <div className="pt-2">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sahifani qayta yuklash / Boshidan boshlash</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

