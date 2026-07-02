(function(){
  if (typeof window === 'undefined') return;
  if (typeof window.hfmV110NormalizeStaff !== 'function') {
    window.hfmV110NormalizeStaff = function(){
      try {
        if (window.state) {
          if (!Array.isArray(window.state.staff)) window.state.staff = [];
          if (!Array.isArray(window.state.staffMarket)) window.state.staffMarket = [];
          if (!window.state.clubStaffCache || typeof window.state.clubStaffCache !== 'object') window.state.clubStaffCache = {};
          if (!window.state.staffSection) window.state.staffSection = 'overview';
        }
      } catch(e) {}
      return true;
    };
  }
  try { window.hfmV110NormalizeStaffEarly = window.hfmV110NormalizeStaff; } catch(e) {}
})();
