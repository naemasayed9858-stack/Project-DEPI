(() => {
  'use strict';

  const STORAGE_KEY = 'flyra_admin_data_v1';
  const PROFILE_KEY = 'flyra_fm_profile_v1';
  const THEME_KEY = 'flyra_admin_theme';

  const DEFAULT_FM_PROFILE = {
    name: 'Omar Al-Farsi',
    initials: 'OA',
    email: 'omar.farsi@flyra.com',
    role: 'Flight Manager',
    title: 'Flight Manager',
    department: 'Flight Operations',
    phone: '+971 50 200 1122',
    lastLogin: '2026-09-04 09:30'
  };

  const FALLBACK_DATA = {
    flights: [
      { id: 'FY-101', airline: 'Flyra', from: 'Dubai', fromCode: 'DXB', to: 'Jeddah', toCode: 'JED', departure: '2026-09-04 08:00', arrival: '2026-09-04 10:30', duration: '2h 30m', aircraft: 'Airbus A320', gate: 'A12', availableSeats: 142, totalSeats: 180, price: 320, status: 'Scheduled', scheduleGroup: 'today' },
      { id: 'FY-204', airline: 'Flyra', from: 'Cairo', fromCode: 'CAI', to: 'Dubai', toCode: 'DXB', departure: '2026-09-04 14:00', arrival: '2026-09-04 19:00', duration: '3h 00m', aircraft: 'Airbus A320', gate: 'A04', availableSeats: 78, totalSeats: 162, price: 280, status: 'Scheduled', scheduleGroup: 'today' },
      { id: 'FY-310', airline: 'Flyra', from: 'Jeddah', fromCode: 'JED', to: 'Istanbul', toCode: 'IST', departure: '2026-09-04 09:15', arrival: '2026-09-04 12:45', duration: '3h 30m', aircraft: 'Airbus A321', gate: 'C08', availableSeats: 55, totalSeats: 200, price: 410, status: 'Delayed', scheduleGroup: 'today' },
      { id: 'FY-505', airline: 'Flyra', from: 'Riyadh', fromCode: 'RUH', to: 'Cairo', toCode: 'CAI', departure: '2026-09-04 16:30', arrival: '2026-09-04 19:00', duration: '2h 30m', aircraft: 'Airbus A320', gate: 'A05', availableSeats: 120, totalSeats: 180, price: 290, status: 'Boarding', scheduleGroup: 'today' },
      { id: 'FY-607', airline: 'Flyra', from: 'Doha', fromCode: 'DOH', to: 'London', toCode: 'LHR', departure: '2026-09-04 01:00', arrival: '2026-09-04 06:30', duration: '7h 30m', aircraft: 'Boeing 787', gate: 'B12', availableSeats: 0, totalSeats: 248, price: 680, status: 'Departed', scheduleGroup: 'today' },
      { id: 'FY-108', airline: 'Flyra', from: 'Dubai', fromCode: 'DXB', to: 'Paris', toCode: 'CDG', departure: '2026-09-04 22:00', arrival: '2026-09-05 04:30', duration: '7h 30m', aircraft: 'Boeing 777', gate: 'D02', availableSeats: 98, totalSeats: 220, price: 720, status: 'Scheduled', scheduleGroup: 'today' },
      { id: 'FY-220', airline: 'Flyra', from: 'Amman', fromCode: 'AMM', to: 'Dubai', toCode: 'DXB', departure: '2026-09-04 11:00', arrival: '2026-09-04 14:00', duration: '3h 00m', aircraft: 'Boeing 737', gate: 'C14', availableSeats: 45, totalSeats: 162, price: 340, status: 'Cancelled', scheduleGroup: 'today' },
      { id: 'FY-215', airline: 'Flyra', from: 'Riyadh', fromCode: 'RUH', to: 'Amman', toCode: 'AMM', departure: '2026-09-04 07:00', arrival: '2026-09-04 09:15', duration: '2h 15m', aircraft: 'Airbus A320', gate: 'A11', availableSeats: 16, totalSeats: 180, price: 310, status: 'Completed', scheduleGroup: 'today' },
      { id: 'FY-412', airline: 'Flyra', from: 'Abu Dhabi', fromCode: 'AUH', to: 'Munich', toCode: 'MUC', departure: '2026-09-05 07:30', arrival: '2026-09-05 12:15', duration: '6h 45m', aircraft: 'Boeing 787', gate: 'D09', availableSeats: 62, totalSeats: 220, price: 640, status: 'Scheduled', scheduleGroup: 'upcoming' },
      { id: 'FY-512', airline: 'Flyra', from: 'Kuwait', fromCode: 'KWI', to: 'Cairo', toCode: 'CAI', departure: '2026-09-06 10:00', arrival: '2026-09-06 12:40', duration: '2h 40m', aircraft: 'Airbus A320', gate: 'B07', availableSeats: 135, totalSeats: 180, price: 275, status: 'Scheduled', scheduleGroup: 'upcoming' }
    ],
    bookings: [
      { ref: 'BK-1001', customer: 'Ahmed Al-Rashid', email: 'ahmed.rashid@gmail.com', flight: 'FY-101', route: 'Dubai → Jeddah', date: '2026-09-04 08:00', passengers: 1, totalPrice: 320, paymentStatus: 'Paid', bookingStatus: 'Confirmed' },
      { ref: 'BK-1002', customer: 'Fatima Al-Zahra', email: 'fatima.zahra@gmail.com', flight: 'FY-310', route: 'Jeddah → Istanbul', date: '2026-09-04 09:15', passengers: 2, totalPrice: 820, paymentStatus: 'Paid', bookingStatus: 'Confirmed' },
      { ref: 'BK-1003', customer: 'Sarah Mitchell', email: 'sarah.mitchell@gmail.com', flight: 'FY-204', route: 'Cairo → Dubai', date: '2026-09-04 14:00', passengers: 1, totalPrice: 280, paymentStatus: 'Pending', bookingStatus: 'Pending' },
      { ref: 'BK-1004', customer: 'Noura Al-Saud', email: 'noura.saud@gmail.com', flight: 'FY-108', route: 'Dubai → Paris', date: '2026-09-04 22:00', passengers: 1, totalPrice: 720, paymentStatus: 'Paid', bookingStatus: 'Confirmed' },
      { ref: 'BK-1005', customer: 'Mohammed Hassan', email: 'mohammed.hassan@gmail.com', flight: 'FY-220', route: 'Amman → Dubai', date: '2026-09-04 11:00', passengers: 1, totalPrice: 340, paymentStatus: 'Refunded', bookingStatus: 'Cancelled' },
      { ref: 'BK-1006', customer: 'Aisha Mohammed', email: 'aisha.mohammed@gmail.com', flight: 'FY-505', route: 'Riyadh → Cairo', date: '2026-09-04 16:30', passengers: 1, totalPrice: 290, paymentStatus: 'Paid', bookingStatus: 'Confirmed' },
      { ref: 'BK-1007', customer: 'Layla Ibrahim', email: 'layla.ibrahim@gmail.com', flight: 'FY-215', route: 'Riyadh → Amman', date: '2026-09-05 12:00', passengers: 1, totalPrice: 310, paymentStatus: 'Pending', bookingStatus: 'Pending' },
      { ref: 'BK-1008', customer: 'Pierre Dubois', email: 'pierre.dubois@gmail.com', flight: 'FY-101', route: 'Dubai → Jeddah', date: '2026-09-05 08:00', passengers: 2, totalPrice: 640, paymentStatus: 'Paid', bookingStatus: 'Confirmed' }
    ],
    notifications: [
      { id: 'NOT-01', category: 'Flight', title: 'Flight FY-310 Delayed', message: 'Jeddah to Istanbul flight delayed by 45 minutes.', time: '5 min ago', unread: true },
      { id: 'NOT-02', category: 'Booking', title: 'New Booking Confirmed', message: 'Booking BK-1008 confirmed for Pierre Dubois.', time: '30 min ago', unread: true },
      { id: 'NOT-03', category: 'Payment', title: 'Payment Received', message: 'Payment of $720 received from Noura Al-Saud.', time: '1 hour ago', unread: true },
      { id: 'NOT-04', category: 'Flight', title: 'Flight FY-220 Cancelled', message: 'Amman to Dubai flight has been cancelled.', time: '2 hours ago', unread: false },
      { id: 'NOT-05', category: 'Refund', title: 'Refund Processed', message: 'Refund of $340 processed for Mohammed Hassan.', time: '3 hours ago', unread: false }
    ]
  };

  let state = null;
  let fmProfile = null;

  const ICONS = {
    eye: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    edit: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
    trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    checkCircle: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    xCircle: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    plane: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    alert: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>',
    ticket: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>',
    user: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    dollar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    refund: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>'
  };

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function statusBadge(status) {
    const slug = String(status || '').toLowerCase().replace(/\s+/g, '-');
    return `<span class="status-badge status-${escapeHtml(slug)}">${escapeHtml(status)}</span>`;
  }

  function formatMoney(num) {
    return '$' + Number(num || 0).toLocaleString('en-US');
  }

  function getInitials(name) {
    const parts = String(name || 'OA').trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(PROFILE_KEY, JSON.stringify(fmProfile));
    } catch (_) {
      // Ignore quota errors
    }
    syncHeaderProfileAndBadge();
  }

  async function loadState() {
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      fmProfile = savedProfile ? JSON.parse(savedProfile) : { ...DEFAULT_FM_PROFILE };
    } catch (_) {
      fmProfile = { ...DEFAULT_FM_PROFILE };
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = JSON.parse(saved);
        return;
      }
    } catch (_) {
      // Ignore parse errors
    }

    try {
      const res = await fetch('../../js/data.json');
      if (res.ok) {
        state = await res.json();
        saveState();
        return;
      }
    } catch (_) {
      // Fallback
    }

    state = JSON.parse(JSON.stringify(FALLBACK_DATA));
    saveState();
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  }

  function openDetailModal(title, rows) {
    const titleEl = document.getElementById('detailModalTitle');
    const bodyEl = document.getElementById('detailModalBody');
    if (!titleEl || !bodyEl) return;
    titleEl.textContent = title;
    bodyEl.innerHTML = `
      <div class="detail-grid">
        ${rows.map(([label, val]) => `
          <div>
            <div class="detail-item-label">${escapeHtml(label)}</div>
            <div class="detail-item-val">${val}</div>
          </div>
        `).join('')}
      </div>
    `;
    openModal('detailModal');
  }

  function initTheme() {
    if (localStorage.getItem(THEME_KEY) === 'dark') {
      document.documentElement.classList.add('dark');
    }
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      });
    }
  }

  function syncHeaderProfileAndBadge() {
    if (!fmProfile || !state) return;
    document.querySelectorAll('.js-user-name').forEach((el) => {
      el.textContent = fmProfile.name;
    });
    document.querySelectorAll('.js-user-initials').forEach((el) => {
      el.textContent = fmProfile.initials || getInitials(fmProfile.name);
    });
    document.querySelectorAll('.js-user-title').forEach((el) => {
      el.textContent = fmProfile.title || fmProfile.role;
    });

    const unreadCount = (state.notifications || []).filter((n) => n.unread).length;
    const badge = document.getElementById('topbarNotifBadge');
    if (badge) {
      badge.textContent = String(unreadCount);
      badge.classList.toggle('hidden', unreadCount === 0);
    }
  }

  function initShell() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuBtn = document.getElementById('mobileMenuBtn');

    if (menuBtn && sidebar && overlay) {
      menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        overlay.classList.add('open');
      });
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
      });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => showToast('Signed out of Flyra Flight Operations'));
    }

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(btn.getAttribute('data-close-modal')));
    });

    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach((m) => m.classList.remove('open'));
      }
    });

    const searchInput = document.getElementById('globalSearchInput');
    const resultsBox = document.getElementById('globalSearchResults');
    if (searchInput && resultsBox) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) {
          resultsBox.classList.remove('open');
          resultsBox.innerHTML = '';
          return;
        }
        const items = [];
        state.flights.forEach((f) => {
          if (`${f.id} ${f.from} ${f.to} ${f.status}`.toLowerCase().includes(q)) {
            items.push({ label: `${f.id} · ${f.from} → ${f.to}`, kind: 'Flight', href: 'flights.html' });
          }
        });
        state.bookings.forEach((b) => {
          if (`${b.ref} ${b.customer} ${b.flight}`.toLowerCase().includes(q)) {
            items.push({ label: `${b.ref} · ${b.customer}`, kind: 'Booking', href: 'bookings.html' });
          }
        });

        resultsBox.innerHTML = items.length
          ? items.slice(0, 8).map((it) => `
            <a href="${it.href}" class="search-result-item">
              <span>${escapeHtml(it.label)}</span>
              <span class="search-result-kind">${escapeHtml(it.kind)}</span>
            </a>
          `).join('')
          : '<div class="search-result-item"><span>No matching records found</span></div>';
        resultsBox.classList.add('open');
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
          resultsBox.classList.remove('open');
        }
      });
    }
  }

  function renderDonutChart(containerId, flights) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const statuses = [
      { key: 'Scheduled', color: '#2563EB' },
      { key: 'Delayed', color: '#F59E0B' },
      { key: 'Boarding', color: '#14B8A6' },
      { key: 'Departed', color: '#6366F1' },
      { key: 'Cancelled', color: '#EF4444' },
      { key: 'Completed', color: '#22C55E' }
    ];
    const total = Math.max(flights.length, 1);
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    const segments = statuses.map((s) => {
      const count = flights.filter((f) => f.status === s.key).length;
      const len = (count / total) * circumference;
      const seg = count > 0
        ? `<circle cx="85" cy="85" r="${radius}" fill="none" stroke="${s.color}" stroke-width="20" stroke-dasharray="${len} ${circumference - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 85 85)" />`
        : '';
      offset += len;
      return { ...s, count, seg };
    });

    el.innerHTML = `
      <div class="donut-svg-wrap">
        <svg viewBox="0 0 170 170" width="170" height="170">
          <circle cx="85" cy="85" r="${radius}" fill="none" stroke="var(--bg-subtle)" stroke-width="20" />
          ${segments.map((s) => s.seg).join('')}
        </svg>
        <div class="donut-center-label">
          <div class="donut-center-val tabular-nums">${flights.length}</div>
          <div class="donut-center-sub">Total</div>
        </div>
      </div>
      <div class="donut-legend">
        ${segments.map((s) => `
          <div class="donut-legend-row">
            <span class="donut-legend-left">
              <span class="legend-dot" style="background:${s.color}"></span>
              ${escapeHtml(s.key)}
            </span>
            <span class="donut-legend-val">${s.count}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  function initDashboard() {
    const todayFlights = state.flights.filter((f) => f.scheduleGroup === 'today');
    const upcomingFlights = state.flights.filter((f) => f.scheduleGroup === 'upcoming');
    const delayedCount = state.flights.filter((f) => f.status === 'Delayed').length;
    const cancelledCount = state.flights.filter((f) => f.status === 'Cancelled').length;
    const availableSeatsTotal = state.flights.reduce((sum, f) => sum + Number(f.availableSeats || 0), 0);

    const kpiEl = document.getElementById('fmKpis');
    if (kpiEl) {
      const kpis = [
        { icon: ICONS.plane, tone: 'blue', value: todayFlights.length, label: "Today's Flights" },
        { icon: ICONS.calendar, tone: 'teal', value: upcomingFlights.length, label: 'Upcoming Flights' },
        { icon: ICONS.alert, tone: 'amber', value: delayedCount, label: 'Delayed Flights' },
        { icon: ICONS.xCircle, tone: 'red', value: cancelledCount, label: 'Cancelled Flights' },
        { icon: ICONS.ticket, tone: 'green', value: availableSeatsTotal, label: 'Available Seats' }
      ];
      kpiEl.innerHTML = kpis.map((k) => `
        <div class="kpi-card">
          <div class="kpi-icon-box ${k.tone}">${k.icon}</div>
          <div>
            <div class="kpi-value tabular-nums">${escapeHtml(k.value)}</div>
            <div class="kpi-label">${escapeHtml(k.label)}</div>
          </div>
        </div>
      `).join('');
    }

    const todayCountEl = document.getElementById('todayScheduleCount');
    if (todayCountEl) todayCountEl.textContent = `${todayFlights.length} flights scheduled`;

    const todayListEl = document.getElementById('todayScheduleList');
    if (todayListEl) {
      todayListEl.innerHTML = todayFlights.map((f) => {
        const depTime = f.departure.split(' ')[1] || f.departure;
        return `
          <div class="compact-flight-row">
            <div class="compact-flight-left">
              <div class="compact-icon-box">${ICONS.plane}</div>
              <div>
                <div class="cell-primary mono-id">${escapeHtml(f.id)}</div>
                <div class="cell-sub">${escapeHtml(f.from)} → ${escapeHtml(f.to)}</div>
              </div>
            </div>
            <div class="compact-flight-right">
              <div class="compact-time-meta">
                <div class="compact-time tabular-nums">${escapeHtml(depTime)}</div>
                <div class="compact-gate">Gate ${escapeHtml(f.gate || 'A01')}</div>
              </div>
              ${statusBadge(f.status)}
            </div>
          </div>
        `;
      }).join('');
    }

    renderDonutChart('fmStatusDonut', state.flights);

    const upcomingEl = document.getElementById('upcomingDeparturesList');
    if (upcomingEl) {
      upcomingEl.innerHTML = upcomingFlights.length
        ? upcomingFlights.map((f) => `
          <div class="compact-flight-row">
            <div class="compact-flight-left">
              <div class="compact-icon-box teal">${ICONS.calendar}</div>
              <div>
                <div class="cell-primary mono-id">${escapeHtml(f.id)}</div>
                <div class="cell-sub">${escapeHtml(f.from)} → ${escapeHtml(f.to)}</div>
              </div>
            </div>
            <div class="compact-time-meta">
              <div class="compact-time tabular-nums">${escapeHtml(f.departure)}</div>
              <div class="compact-gate tabular-nums">${f.availableSeats} seats</div>
            </div>
          </div>
        `).join('')
        : '<div class="empty-state">No upcoming departures.</div>';
    }

    const alertsEl = document.getElementById('delayedAlertsList');
    if (alertsEl) {
      const alertFlights = state.flights.filter((f) => f.status === 'Delayed' || f.status === 'Cancelled');
      alertsEl.innerHTML = alertFlights.length
        ? alertFlights.map((f) => {
          const isDelayed = f.status === 'Delayed';
          return `
            <div class="alert-flight-card ${isDelayed ? 'delayed' : 'cancelled'}">
              <div class="compact-flight-left">
                <div class="alert-icon">${isDelayed ? ICONS.alert : ICONS.xCircle}</div>
                <div>
                  <div class="cell-primary">${escapeHtml(f.id)} — ${escapeHtml(f.status)}</div>
                  <div class="cell-sub">${escapeHtml(f.from)} → ${escapeHtml(f.to)} · ${escapeHtml(f.departure)}</div>
                </div>
              </div>
              ${statusBadge(f.status)}
            </div>
          `;
        }).join('')
        : '<div class="empty-state">All flights operating normally.</div>';
    }
  }

  function initFlights() {
    const tbody = document.getElementById('flightsTableBody');
    const searchInput = document.getElementById('flightsSearchInput');
    const addBtn = document.getElementById('openAddFlightBtn');
    const form = document.getElementById('flightForm');
    const statuses = ['Scheduled', 'Delayed', 'Boarding', 'Departed', 'Cancelled', 'Completed'];

    function render(query = '') {
      const q = query.trim().toLowerCase();
      const rows = state.flights.filter((f) =>
        `${f.id} ${f.airline} ${f.from} ${f.to} ${f.status}`.toLowerCase().includes(q)
      );

      if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="10" class="empty-state">No flights match your search.</td></tr>';
        return;
      }

      tbody.innerHTML = rows.map((f) => `
        <tr>
          <td class="cell-primary mono-id">${escapeHtml(f.id)}</td>
          <td>${escapeHtml(f.airline)}</td>
          <td>${escapeHtml(f.from)}</td>
          <td>${escapeHtml(f.to)}</td>
          <td class="tabular-nums">${escapeHtml(f.departure)}</td>
          <td class="tabular-nums">${escapeHtml(f.arrival)}</td>
          <td class="tabular-nums ${f.availableSeats === 0 ? 'seats-full' : ''}">${f.availableSeats}/${f.totalSeats}</td>
          <td class="cell-primary tabular-nums">${formatMoney(f.price)}</td>
          <td>
            <div class="status-cell-wrap">
              ${statusBadge(f.status)}
              <select class="inline-status-select" data-flight-status="${escapeHtml(f.id)}" aria-label="Update flight status">
                ${statuses.map((s) => `<option value="${s}" ${s === f.status ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </td>
          <td>
            <div class="actions-cell">
              <button type="button" class="action-icon-btn" data-view-flight="${escapeHtml(f.id)}" title="View">${ICONS.eye}</button>
              <button type="button" class="action-icon-btn" data-edit-flight="${escapeHtml(f.id)}" title="Edit">${ICONS.edit}</button>
              <button type="button" class="action-icon-btn danger" data-delete-flight="${escapeHtml(f.id)}" title="Delete">${ICONS.trash}</button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    render();
    if (searchInput) searchInput.addEventListener('input', () => render(searchInput.value));

    tbody.addEventListener('change', (e) => {
      const sel = e.target.closest('[data-flight-status]');
      if (!sel) return;
      const id = sel.getAttribute('data-flight-status');
      const flight = state.flights.find((f) => f.id === id);
      if (flight) {
        flight.status = sel.value;
        saveState();
        render(searchInput ? searchInput.value : '');
        showToast(`Flight ${id} updated to ${sel.value}`);
      }
    });

    tbody.addEventListener('click', (e) => {
      const viewBtn = e.target.closest('[data-view-flight]');
      const editBtn = e.target.closest('[data-edit-flight]');
      const delBtn = e.target.closest('[data-delete-flight]');

      if (viewBtn) {
        const f = state.flights.find((item) => item.id === viewBtn.getAttribute('data-view-flight'));
        if (f) {
          openDetailModal(`Flight ${f.id}`, [
            ['Route', `${escapeHtml(f.from)} → ${escapeHtml(f.to)}`],
            ['Status', statusBadge(f.status)],
            ['Departure', escapeHtml(f.departure)],
            ['Arrival', escapeHtml(f.arrival)],
            ['Aircraft', escapeHtml(f.aircraft || 'Airbus A320')],
            ['Gate', escapeHtml(f.gate || 'A01')],
            ['Available Seats', `${f.availableSeats} / ${f.totalSeats}`],
            ['Ticket Price', formatMoney(f.price)]
          ]);
        }
      } else if (editBtn) {
        const f = state.flights.find((item) => item.id === editBtn.getAttribute('data-edit-flight'));
        if (f) {
          document.getElementById('flightModalTitle').textContent = `Edit Flight ${f.id}`;
          document.getElementById('flightSubmitBtn').textContent = 'Save Changes';
          document.getElementById('flightEditOriginalId').value = f.id;
          document.getElementById('flightNumberInput').value = f.id;
          document.getElementById('flightAirlineInput').value = f.airline;
          document.getElementById('flightFromInput').value = f.from;
          document.getElementById('flightToInput').value = f.to;
          document.getElementById('flightDepartureInput').value = f.departure;
          document.getElementById('flightAircraftInput').value = f.aircraft || 'Airbus A320';
          document.getElementById('flightSeatsInput').value = f.totalSeats;
          document.getElementById('flightPriceInput').value = f.price;
          openModal('flightModal');
        }
      } else if (delBtn) {
        const id = delBtn.getAttribute('data-delete-flight');
        state.flights = state.flights.filter((item) => item.id !== id);
        saveState();
        render(searchInput ? searchInput.value : '');
        showToast(`Flight ${id} removed`);
      }
    });

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('flightEditOriginalId').value = '';
        document.getElementById('flightAirlineInput').value = 'Flyra';
        document.getElementById('flightModalTitle').textContent = 'Add New Flight';
        document.getElementById('flightSubmitBtn').textContent = 'Create Flight';
        openModal('flightModal');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const origId = document.getElementById('flightEditOriginalId').value;
        const id = document.getElementById('flightNumberInput').value.trim().toUpperCase();
        const airline = document.getElementById('flightAirlineInput').value.trim() || 'Flyra';
        const from = document.getElementById('flightFromInput').value.trim();
        const to = document.getElementById('flightToInput').value.trim();
        const departure = document.getElementById('flightDepartureInput').value.trim() || '2026-09-06 08:00';
        const aircraft = document.getElementById('flightAircraftInput').value.trim() || 'Airbus A320';
        const totalSeats = Number(document.getElementById('flightSeatsInput').value) || 180;
        const price = Number(document.getElementById('flightPriceInput').value) || 320;

        if (origId) {
          const idx = state.flights.findIndex((f) => f.id === origId);
          if (idx > -1) {
            state.flights[idx] = {
              ...state.flights[idx],
              id, airline, from, to, departure, aircraft, totalSeats, price,
              fromCode: from.slice(0, 3).toUpperCase(),
              toCode: to.slice(0, 3).toUpperCase()
            };
            showToast(`Flight ${id} updated`);
          }
        } else {
          state.flights.unshift({
            id,
            airline,
            from,
            fromCode: from.slice(0, 3).toUpperCase(),
            to,
            toCode: to.slice(0, 3).toUpperCase(),
            departure,
            arrival: departure.replace('08:00', '10:30'),
            duration: '2h 30m',
            aircraft,
            gate: 'A09',
            availableSeats: totalSeats,
            totalSeats,
            price,
            status: 'Scheduled',
            scheduleGroup: 'upcoming'
          });
          showToast(`Flight ${id} created`);
        }
        saveState();
        closeModal('flightModal');
        render(searchInput ? searchInput.value : '');
      });
    }
  }

  function initBookings() {
    const tbody = document.getElementById('bookingsTableBody');
    const searchInput = document.getElementById('bookingsSearchInput');

    function render(query = '') {
      const q = query.trim().toLowerCase();
      const rows = state.bookings.filter((b) =>
        `${b.ref} ${b.customer} ${b.email} ${b.flight} ${b.route} ${b.bookingStatus}`.toLowerCase().includes(q)
      );

      if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="9" class="empty-state">No bookings found.</td></tr>';
        return;
      }

      tbody.innerHTML = rows.map((b) => `
        <tr>
          <td class="cell-primary mono-id">${escapeHtml(b.ref)}</td>
          <td>
            <div class="cell-primary">${escapeHtml(b.customer)}</div>
            <div class="cell-sub">${escapeHtml(b.email)}</div>
          </td>
          <td>
            <div class="cell-primary">${escapeHtml(b.flight)}</div>
            <div class="cell-sub">${escapeHtml(b.route)}</div>
          </td>
          <td class="tabular-nums">${escapeHtml(b.date)}</td>
          <td><span class="passengers-cell tabular-nums">${ICONS.user} ${b.passengers}</span></td>
          <td class="cell-primary tabular-nums">${formatMoney(b.totalPrice)}</td>
          <td>${statusBadge(b.paymentStatus)}</td>
          <td>${statusBadge(b.bookingStatus)}</td>
          <td>
            <div class="actions-cell">
              ${b.bookingStatus === 'Pending' ? `<button type="button" class="action-icon-btn success" data-confirm-booking="${escapeHtml(b.ref)}" title="Confirm booking">${ICONS.checkCircle}</button>` : ''}
              <button type="button" class="action-icon-btn" data-view-booking="${escapeHtml(b.ref)}" title="View">${ICONS.eye}</button>
              ${b.bookingStatus !== 'Cancelled' ? `<button type="button" class="action-icon-btn danger" data-cancel-booking="${escapeHtml(b.ref)}" title="Cancel booking">${ICONS.xCircle}</button>` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    }

    render();
    if (searchInput) searchInput.addEventListener('input', () => render(searchInput.value));

    tbody.addEventListener('click', (e) => {
      const confirmBtn = e.target.closest('[data-confirm-booking]');
      const viewBtn = e.target.closest('[data-view-booking]');
      const cancelBtn = e.target.closest('[data-cancel-booking]');

      if (confirmBtn) {
        const ref = confirmBtn.getAttribute('data-confirm-booking');
        const b = state.bookings.find((item) => item.ref === ref);
        if (b) {
          b.bookingStatus = 'Confirmed';
          b.paymentStatus = 'Paid';
          saveState();
          render(searchInput ? searchInput.value : '');
          showToast(`Booking ${ref} confirmed`);
        }
      } else if (viewBtn) {
        const b = state.bookings.find((item) => item.ref === viewBtn.getAttribute('data-view-booking'));
        if (b) {
          openDetailModal(`Booking ${b.ref}`, [
            ['Customer', escapeHtml(b.customer)],
            ['Email', escapeHtml(b.email)],
            ['Flight', `${escapeHtml(b.flight)} (${escapeHtml(b.route)})`],
            ['Departure Date', escapeHtml(b.date)],
            ['Passengers', String(b.passengers)],
            ['Total Price', formatMoney(b.totalPrice)],
            ['Payment Status', statusBadge(b.paymentStatus)],
            ['Booking Status', statusBadge(b.bookingStatus)]
          ]);
        }
      } else if (cancelBtn) {
        const ref = cancelBtn.getAttribute('data-cancel-booking');
        const b = state.bookings.find((item) => item.ref === ref);
        if (b) {
          b.bookingStatus = 'Cancelled';
          b.paymentStatus = 'Refunded';
          saveState();
          render(searchInput ? searchInput.value : '');
          showToast(`Booking ${ref} cancelled`);
        }
      }
    });
  }

  function initFlightSchedule() {
    const listEl = document.getElementById('scheduleList');
    const tabsEl = document.getElementById('scheduleTabs');
    let activeFilter = 'all';

    function render() {
      const items = state.flights.filter((f) => activeFilter === 'all' || f.scheduleGroup === activeFilter);
      if (!items.length) {
        listEl.innerHTML = '<div class="card empty-state">No scheduled flights for this filter.</div>';
        return;
      }

      listEl.innerHTML = items.map((f) => {
        const depTime = f.departure.split(' ')[1] || '08:00';
        const arrTime = f.arrival.split(' ')[1] || '10:30';
        return `
          <div class="schedule-card" data-schedule-flight="${escapeHtml(f.id)}">
            <div class="schedule-flight-info">
              <div class="schedule-plane-box">${ICONS.plane}</div>
              <div>
                <div class="schedule-flight-code">${escapeHtml(f.id)}</div>
                <div class="schedule-aircraft">${escapeHtml(f.airline)} • ${escapeHtml(f.aircraft || 'Airbus A320')}</div>
              </div>
            </div>

            <div class="schedule-timeline">
              <div class="schedule-time-block">
                <div class="schedule-time tabular-nums">${escapeHtml(depTime)}</div>
                <div class="schedule-city">${escapeHtml(f.fromCode)} • ${escapeHtml(f.from)}</div>
              </div>
              <div class="schedule-duration-line">
                <div class="schedule-line-bar"></div>
                <span>${ICONS.clock} ${escapeHtml(f.duration || '2h 30m')}</span>
              </div>
              <div class="schedule-time-block end">
                <div class="schedule-time tabular-nums">${escapeHtml(arrTime)}</div>
                <div class="schedule-city">${escapeHtml(f.toCode)} • ${escapeHtml(f.to)}</div>
              </div>
            </div>

            <div class="schedule-right">
              <div class="schedule-gate-meta">
                <div><strong>Gate ${escapeHtml(f.gate || 'A01')}</strong></div>
                <div class="tabular-nums">${f.availableSeats} seats available</div>
              </div>
              ${statusBadge(f.status)}
            </div>
          </div>
        `;
      }).join('');
    }

    render();

    if (tabsEl) {
      tabsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.schedule-tab');
        if (!btn) return;
        tabsEl.querySelectorAll('.schedule-tab').forEach((t) => t.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        render();
      });
    }

    listEl.addEventListener('click', (e) => {
      const card = e.target.closest('[data-schedule-flight]');
      if (!card) return;
      const f = state.flights.find((item) => item.id === card.getAttribute('data-schedule-flight'));
      if (f) {
        openDetailModal(`Schedule — ${f.id}`, [
          ['Route', `${escapeHtml(f.from)} (${escapeHtml(f.fromCode)}) → ${escapeHtml(f.to)} (${escapeHtml(f.toCode)})`],
          ['Status', statusBadge(f.status)],
          ['Departure', escapeHtml(f.departure)],
          ['Arrival', escapeHtml(f.arrival)],
          ['Gate', escapeHtml(f.gate || 'A01')],
          ['Aircraft', escapeHtml(f.aircraft || 'Airbus A320')]
        ]);
      }
    });
  }

  function initNotifications() {
    const listEl = document.getElementById('notificationsList');
    const tabsEl = document.getElementById('notifTabs');
    const markAllBtn = document.getElementById('markAllReadBtn');
    const unreadCountEl = document.getElementById('unreadTabCount');
    let activeTab = 'All';

    function iconForCategory(cat) {
      if (cat === 'Flight') return `<div class="notif-icon-box flight">${ICONS.plane}</div>`;
      if (cat === 'Booking') return `<div class="notif-icon-box booking">${ICONS.ticket}</div>`;
      if (cat === 'Payment') return `<div class="notif-icon-box payment">${ICONS.dollar}</div>`;
      return `<div class="notif-icon-box refund">${ICONS.refund}</div>`;
    }

    function render() {
      const unreadTotal = state.notifications.filter((n) => n.unread).length;
      if (unreadCountEl) unreadCountEl.textContent = String(unreadTotal);

      const items = state.notifications.filter((n) => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Unread') return n.unread;
        return n.category === activeTab;
      });

      listEl.innerHTML = items.length
        ? items.map((n) => `
          <div class="notif-item ${n.unread ? 'unread' : ''}" data-notif-id="${escapeHtml(n.id)}">
            ${iconForCategory(n.category)}
            <div class="notif-body">
              <div class="notif-title-row">
                <span class="notif-title">${escapeHtml(n.title)}</span>
                ${n.unread ? '<span class="notif-unread-dot" aria-label="Unread"></span>' : ''}
              </div>
              <div class="notif-message">${escapeHtml(n.message)}</div>
              <div class="notif-time">${escapeHtml(n.time)}</div>
            </div>
          </div>
        `).join('')
        : '<div class="empty-state">No notifications in this category.</div>';
    }

    render();

    if (tabsEl) {
      tabsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.notif-tab');
        if (!btn) return;
        tabsEl.querySelectorAll('.notif-tab').forEach((t) => t.classList.remove('active'));
        btn.classList.add('active');
        activeTab = btn.getAttribute('data-tab');
        render();
      });
    }

    listEl.addEventListener('click', (e) => {
      const row = e.target.closest('[data-notif-id]');
      if (!row) return;
      const n = state.notifications.find((item) => item.id === row.getAttribute('data-notif-id'));
      if (n && n.unread) {
        n.unread = false;
        saveState();
        render();
      }
    });

    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        state.notifications.forEach((n) => { n.unread = false; });
        saveState();
        render();
        showToast('All notifications marked as read');
      });
    }
  }

  function initProfile() {
    function renderProfileCard() {
      const p = fmProfile;
      document.getElementById('profileAvatarLg').textContent = p.initials || getInitials(p.name);
      document.getElementById('profileDisplayName').textContent = p.name;
      document.getElementById('profileDisplayEmail').textContent = p.email;
      document.getElementById('profileDisplayRole').textContent = p.role;
      document.getElementById('profileDisplayDept').textContent = p.department;
      document.getElementById('profileDisplayPhone').textContent = p.phone;
      document.getElementById('profileDisplayLogin').textContent = p.lastLogin;
    }

    renderProfileCard();

    const openEditBtn = document.getElementById('openEditProfileBtn');
    const editForm = document.getElementById('editProfileForm');
    const passwordForm = document.getElementById('changePasswordForm');

    if (openEditBtn) {
      openEditBtn.addEventListener('click', () => {
        document.getElementById('editProfileName').value = fmProfile.name;
        document.getElementById('editProfileEmail').value = fmProfile.email;
        document.getElementById('editProfilePhone').value = fmProfile.phone;
        document.getElementById('editProfileDept').value = fmProfile.department;
        openModal('editProfileModal');
      });
    }

    if (editForm) {
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('editProfileName').value.trim();
        fmProfile.name = name;
        fmProfile.initials = getInitials(name);
        fmProfile.email = document.getElementById('editProfileEmail').value.trim();
        fmProfile.phone = document.getElementById('editProfilePhone').value.trim();
        fmProfile.department = document.getElementById('editProfileDept').value.trim();
        saveState();
        renderProfileCard();
        closeModal('editProfileModal');
        showToast('Profile updated successfully');
      });
    }

    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const current = document.getElementById('currentPasswordInput').value;
        const next = document.getElementById('newPasswordInput').value;
        const confirm = document.getElementById('confirmPasswordInput').value;

        if (!current || next.length < 6) {
          showToast('New password must be at least 6 characters', 'error');
          return;
        }
        if (next !== confirm) {
          showToast('Passwords do not match', 'error');
          return;
        }
        passwordForm.reset();
        showToast('Password updated successfully');
      });
    }
  }

  async function bootstrap() {
    initTheme();
    await loadState();
    syncHeaderProfileAndBadge();
    initShell();

    const page = document.body.getAttribute('data-page');
    const handlers = {
      dashboard: initDashboard,
      flights: initFlights,
      bookings: initBookings,
      'flight-schedule': initFlightSchedule,
      notifications: initNotifications,
      profile: initProfile
    };

    if (handlers[page]) {
      handlers[page]();
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
