(() => {
  'use strict';

  const STORAGE_KEY = 'flyra_admin_data_v1';
  const THEME_KEY = 'flyra_admin_theme';

  const FALLBACK_DATA = {
    profile: {
      name: 'Admin User',
      initials: 'AU',
      email: 'admin@flyra.com',
      role: 'Admin',
      title: 'Administrator',
      department: 'Management',
      phone: '+971 50 100 0001',
      lastLogin: '2026-09-04 09:30'
    },
    flights: [
      { id: 'FY-101', airline: 'Flyra', from: 'Dubai', fromCode: 'DXB', to: 'Jeddah', toCode: 'JED', departure: '2026-09-04 08:00', arrival: '2026-09-04 10:30', duration: '2h 30m', aircraft: 'Airbus A320', gate: 'B12', availableSeats: 142, totalSeats: 180, price: 320, status: 'Scheduled', scheduleGroup: 'today' },
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
    customers: [
      { id: 'CUS-01', initials: 'AR', name: 'Ahmed Al-Rashid', email: 'ahmed.rashid@gmail.com', phone: '+971 50 123 4567', bookings: 12, country: 'UAE', status: 'Active' },
      { id: 'CUS-02', initials: 'SM', name: 'Sarah Mitchell', email: 'sarah.mitchell@gmail.com', phone: '+44 7700 900456', bookings: 8, country: 'UK', status: 'Active' },
      { id: 'CUS-03', initials: 'MH', name: 'Mohammed Hassan', email: 'mohammed.hassan@gmail.com', phone: '+20 100 234 5678', bookings: 5, country: 'Egypt', status: 'Active' },
      { id: 'CUS-04', initials: 'FZ', name: 'Fatima Al-Zahra', email: 'fatima.zahra@gmail.com', phone: '+966 55 123 4567', bookings: 15, country: 'Saudi Arabia', status: 'Active' },
      { id: 'CUS-05', initials: 'JD', name: 'John Davidson', email: 'john.davidson@gmail.com', phone: '+1 555 123 4567', bookings: 2, country: 'USA', status: 'Blocked' },
      { id: 'CUS-06', initials: 'LI', name: 'Layla Ibrahim', email: 'layla.ibrahim@gmail.com', phone: '+962 7 9012 3456', bookings: 7, country: 'Jordan', status: 'Active' },
      { id: 'CUS-07', initials: 'PD', name: 'Pierre Dubois', email: 'pierre.dubois@gmail.com', phone: '+33 6 1234 5678', bookings: 4, country: 'France', status: 'Active' },
      { id: 'CUS-08', initials: 'NS', name: 'Noura Al-Saud', email: 'noura.saud@gmail.com', phone: '+966 50 987 6543', bookings: 20, country: 'Saudi Arabia', status: 'Active' },
      { id: 'CUS-09', initials: 'AM', name: 'Aisha Mohammed', email: 'aisha.mohammed@gmail.com', phone: '+971 52 876 5432', bookings: 9, country: 'UAE', status: 'Active' },
      { id: 'CUS-10', initials: 'KT', name: 'Karim Tarek', email: 'karim.tarek@gmail.com', phone: '+20 111 456 7890', bookings: 3, country: 'Egypt', status: 'Active' }
    ],
    employees: [
      { id: 'EMP-01', initials: 'AU', color: '#2563EB', name: 'Admin User', email: 'admin@flyra.com', phone: '+971 50 100 0001', role: 'Admin', department: 'Management', status: 'Active' },
      { id: 'EMP-02', initials: 'OA', color: '#0D9488', name: 'Omar Al-Farsi', email: 'omar.farsi@flyra.com', phone: '+971 50 200 1122', role: 'Flight Manager', department: 'Flight Operations', status: 'Active' },
      { id: 'EMP-03', initials: 'MS', color: '#16A34A', name: 'Mariam Saleh', email: 'mariam.saleh@flyra.com', phone: '+971 50 300 2233', role: 'Customer Service', department: 'Customer Service', status: 'Active' },
      { id: 'EMP-04', initials: 'KI', color: '#EA580C', name: 'Khaled Ibrahim', email: 'khaled.ibrahim@flyra.com', phone: '+971 50 400 3344', role: 'Finance', department: 'Finance', status: 'Active' },
      { id: 'EMP-05', initials: 'SA', color: '#2563EB', name: 'Sara Al-Dabbous', email: 'sara.dabbous@flyra.com', phone: '+971 50 500 4455', role: 'Customer Service', department: 'Customer Service', status: 'Active' },
      { id: 'EMP-06', initials: 'YH', color: '#DC2626', name: 'Youssef Haddad', email: 'youssef.haddad@flyra.com', phone: '+971 50 600 5566', role: 'Flight Manager', department: 'Flight Operations', status: 'Active' },
      { id: 'EMP-07', initials: 'RK', color: '#0891B2', name: 'Reem Al-Kuwari', email: 'reem.kuwari@flyra.com', phone: '+971 50 700 6677', role: 'Finance', department: 'Finance', status: 'Inactive' }
    ],
    payments: [
      { id: 'TXN-001', booking: 'BK-1001', customer: 'Ahmed Al-Rashid', amount: 320, method: 'Credit Card', status: 'Paid', date: '2026-08-20' },
      { id: 'TXN-002', booking: 'BK-1002', customer: 'Fatima Al-Zahra', amount: 820, method: 'PayPal', status: 'Paid', date: '2026-08-18' },
      { id: 'TXN-003', booking: 'BK-1003', customer: 'Sarah Mitchell', amount: 280, method: 'Credit Card', status: 'Pending', date: '2026-08-25' },
      { id: 'TXN-004', booking: 'BK-1004', customer: 'Noura Al-Saud', amount: 720, method: 'Debit Card', status: 'Refunded', date: '2026-08-22' },
      { id: 'TXN-005', booking: 'BK-1005', customer: 'Mohammed Hassan', amount: 340, method: 'Credit Card', status: 'Refunded', date: '2026-08-15' },
      { id: 'TXN-006', booking: 'BK-1006', customer: 'Aisha Mohammed', amount: 290, method: 'Bank Transfer', status: 'Paid', date: '2026-08-27' },
      { id: 'TXN-007', booking: 'BK-1007', customer: 'Layla Ibrahim', amount: 310, method: 'Credit Card', status: 'Pending', date: '2026-08-30' },
      { id: 'TXN-008', booking: 'BK-1008', customer: 'Pierre Dubois', amount: 650, method: 'Credit Card', status: 'Paid', date: '2026-08-28' }
    ],
    refunds: [
      { id: 'REF-001', booking: 'BK-1005', customer: 'Mohammed Hassan', amount: 340, reason: 'Flight cancelled by airline', status: 'Processed', date: '2026-08-15' },
      { id: 'REF-002', booking: 'BK-1003', customer: 'Sarah Mitchell', amount: 280, reason: 'Customer request - schedule conflict', status: 'Pending', date: '2026-08-26' },
      { id: 'REF-003', booking: 'BK-1007', customer: 'Layla Ibrahim', amount: 310, reason: 'Duplicate booking', status: 'Approved', date: '2026-08-31' },
      { id: 'REF-004', booking: 'BK-1002', customer: 'Fatima Al-Zahra', amount: 410, reason: 'Partial refund - seat downgrade', status: 'Pending', date: '2026-09-01' }
    ],
    notifications: [
      { id: 'NOT-01', category: 'Flight', title: 'Flight FY-310 Delayed', message: 'Jeddah to Istanbul flight delayed by 45 minutes.', time: '5 min ago', unread: true },
      { id: 'NOT-02', category: 'Booking', title: 'New Booking Confirmed', message: 'Booking BK-1008 confirmed for Pierre Dubois.', time: '30 min ago', unread: true },
      { id: 'NOT-03', category: 'Payment', title: 'Payment Received', message: 'Payment of $720 received from Noura Al-Saud.', time: '1 hour ago', unread: true },
      { id: 'NOT-04', category: 'Flight', title: 'Flight FY-220 Cancelled', message: 'Amman to Dubai flight has been cancelled.', time: '2 hours ago', unread: false },
      { id: 'NOT-05', category: 'Refund', title: 'Refund Processed', message: 'Refund of $340 processed for Mohammed Hassan.', time: '3 hours ago', unread: false }
    ],
    activities: [
      { initials: 'AU', color: '#2563EB', actor: 'Admin User', action: 'created flight', target: 'FY-512', time: '10 min ago' },
      { initials: 'OA', color: '#0D9488', actor: 'Omar Al-Farsi', action: 'updated status for', target: 'FY-310 to Delayed', time: '20 min ago' },
      { initials: 'MS', color: '#16A34A', actor: 'Mariam Saleh', action: 'confirmed booking', target: 'BK-1008', time: '45 min ago' },
      { initials: 'KI', color: '#EA580C', actor: 'Khaled Ibrahim', action: 'verified payment for', target: 'BK-1004', time: '1 hour ago' },
      { initials: 'AU', color: '#2563EB', actor: 'Admin User', action: 'blocked customer', target: 'John Davidson', time: '2 hours ago' },
      { initials: 'SA', color: '#2563EB', actor: 'Sara Al-Dabbous', action: 'cancelled booking', target: 'BK-1005', time: '3 hours ago' }
    ],
    charts: {
      bookingTrends: [
        { label: 'Mon', value: 42 },
        { label: 'Tue', value: 58 },
        { label: 'Wed', value: 49 },
        { label: 'Thu', value: 64 },
        { label: 'Fri', value: 82 },
        { label: 'Sat', value: 91 },
        { label: 'Sun', value: 56 }
      ],
      revenueTrends: [
        { label: 'Jan', value: 2400 },
        { label: 'Feb', value: 2650 },
        { label: 'Mar', value: 3100 },
        { label: 'Apr', value: 2850 },
        { label: 'May', value: 3600 },
        { label: 'Jun', value: 3950 },
        { label: 'Jul', value: 4650 },
        { label: 'Aug', value: 5120 },
        { label: 'Sep', value: 4580 }
      ],
      dailyRevenue: [
        { label: 'W1', value: 1820 },
        { label: 'W2', value: 1950 },
        { label: 'W3', value: 1740 },
        { label: 'W4', value: 2380 },
        { label: 'W5', value: 2190 },
        { label: 'W6', value: 2640 },
        { label: 'W7', value: 2510 },
        { label: 'W8', value: 2810 }
      ]
    }
  };

  let state = null;

  const ICONS = {
    eye: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
    edit: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',
    trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    checkCircle: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    xCircle: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    ban: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>',
    refund: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
    user: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    plane: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    ticket: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>',
    users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    userPlus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>',
    dollar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    alert: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>',
    calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    trendUp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    wallet: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>',
    doc: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>',
    clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    power: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/></svg>'
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
    const parts = String(name || 'AU').trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      // Ignore quota errors
    }
    syncHeaderProfileAndBadge();
  }

  async function loadState() {
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
      // Fallback when opened without HTTP server
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
    setTimeout(() => {
      el.remove();
    }, 3000);
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
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') {
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
    if (!state) return;
    const p = state.profile;
    document.querySelectorAll('.js-user-name').forEach((el) => {
      el.textContent = p.name;
    });
    document.querySelectorAll('.js-user-initials').forEach((el) => {
      el.textContent = p.initials || getInitials(p.name);
    });
    document.querySelectorAll('.js-user-title').forEach((el) => {
      el.textContent = p.title || p.role;
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
      logoutBtn.addEventListener('click', () => {
        showToast('Signed out of Flyra Admin Console');
      });
    }

    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        closeModal(btn.getAttribute('data-close-modal'));
      });
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

    // Global live search
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
          if (`${f.id} ${f.from} ${f.to}`.toLowerCase().includes(q)) {
            items.push({ label: `${f.id} · ${f.from} → ${f.to}`, kind: 'Flight', href: 'flights.html' });
          }
        });
        state.bookings.forEach((b) => {
          if (`${b.ref} ${b.customer} ${b.flight}`.toLowerCase().includes(q)) {
            items.push({ label: `${b.ref} · ${b.customer}`, kind: 'Booking', href: 'bookings.html' });
          }
        });
        state.customers.forEach((c) => {
          if (`${c.name} ${c.email} ${c.country}`.toLowerCase().includes(q)) {
            items.push({ label: `${c.name} (${c.country})`, kind: 'Customer', href: 'customers.html' });
          }
        });
        state.employees.forEach((emp) => {
          if (`${emp.name} ${emp.role} ${emp.department}`.toLowerCase().includes(q)) {
            items.push({ label: `${emp.name} · ${emp.role}`, kind: 'Employee', href: 'employees.html' });
          }
        });

        if (items.length === 0) {
          resultsBox.innerHTML = '<div class="search-result-item"><span>No matching records found</span></div>';
        } else {
          resultsBox.innerHTML = items.slice(0, 8).map((it) => `
            <a href="${it.href}" class="search-result-item">
              <span>${escapeHtml(it.label)}</span>
              <span class="search-result-kind">${escapeHtml(it.kind)}</span>
            </a>
          `).join('');
        }
        resultsBox.classList.add('open');
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
          resultsBox.classList.remove('open');
        }
      });
    }
  }

  /* ---------- Interactive SVG Charts ---------- */
  function renderBarChart(containerId, data) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const width = 560;
    const height = 220;
    const pad = { top: 18, right: 16, bottom: 28, left: 16 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const maxVal = Math.max(...data.map((d) => d.value), 10) * 1.12;
    const step = plotW / data.length;
    const barW = Math.min(44, step * 0.56);

    const gridLines = [0.25, 0.5, 0.75, 1].map((ratio) => {
      const y = pad.top + plotH * (1 - ratio);
      return `<line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3 3" />`;
    }).join('');

    const bars = data.map((d, i) => {
      const bh = (d.value / maxVal) * plotH;
      const x = pad.left + i * step + (step - barW) / 2;
      const y = pad.top + plotH - bh;
      return `
        <g class="chart-bar-group" data-label="${escapeHtml(d.label)}" data-val="${d.value} bookings">
          <rect x="${x}" y="${y}" width="${barW}" height="${bh}" rx="6" fill="url(#flyraBarGrad)" style="cursor:pointer" />
          <text x="${x + barW / 2}" y="${height - 8}" text-anchor="middle" fill="var(--text-muted)" font-size="11">${escapeHtml(d.label)}</text>
        </g>
      `;
    }).join('');

    el.innerHTML = `
      <div class="chart-tooltip"></div>
      <svg viewBox="0 0 ${width} ${height}" width="100%" height="220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="flyraBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#93c5fd" />
          </linearGradient>
        </defs>
        ${gridLines}
        ${bars}
      </svg>
    `;

    attachChartTooltips(el, '.chart-bar-group');
  }

  function renderAreaChart(containerId, data, colorHex, gradId, valuePrefix = '$') {
    const el = document.getElementById(containerId);
    if (!el) return;
    const width = 560;
    const height = 220;
    const pad = { top: 20, right: 20, bottom: 28, left: 20 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const maxVal = Math.max(...data.map((d) => d.value), 10) * 1.15;
    const minVal = Math.min(...data.map((d) => d.value)) * 0.45;
    const span = Math.max(maxVal - minVal, 1);

    const pts = data.map((d, i) => {
      const x = pad.left + (i / Math.max(data.length - 1, 1)) * plotW;
      const y = pad.top + plotH - ((d.value - minVal) / span) * plotH;
      return { x, y, ...d };
    });

    const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const areaD = `${lineD} L ${pts[pts.length - 1].x.toFixed(1)} ${(pad.top + plotH).toFixed(1)} L ${pts[0].x.toFixed(1)} ${(pad.top + plotH).toFixed(1)} Z`;

    const gridLines = [0.25, 0.5, 0.75].map((ratio) => {
      const y = pad.top + plotH * ratio;
      return `<line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="var(--border-color)" stroke-dasharray="3 3" />`;
    }).join('');

    const dots = pts.map((p) => `
      <g class="chart-pt-group" data-label="${escapeHtml(p.label)}" data-val="${valuePrefix}${p.value.toLocaleString('en-US')}">
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="10" fill="transparent" style="cursor:pointer" />
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="#ffffff" stroke="${colorHex}" stroke-width="2" />
        <text x="${p.x.toFixed(1)}" y="${height - 8}" text-anchor="middle" fill="var(--text-muted)" font-size="11">${escapeHtml(p.label)}</text>
      </g>
    `).join('');

    el.innerHTML = `
      <div class="chart-tooltip"></div>
      <svg viewBox="0 0 ${width} ${height}" width="100%" height="220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${colorHex}" stop-opacity="0.22" />
            <stop offset="100%" stop-color="${colorHex}" stop-opacity="0.01" />
          </linearGradient>
        </defs>
        ${gridLines}
        <path d="${areaD}" fill="url(#${gradId})" />
        <path d="${lineD}" fill="none" stroke="${colorHex}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        ${dots}
      </svg>
    `;

    attachChartTooltips(el, '.chart-pt-group');
  }

  function attachChartTooltips(container, selector) {
    const tooltip = container.querySelector('.chart-tooltip');
    if (!tooltip) return;
    container.querySelectorAll(selector).forEach((node) => {
      node.addEventListener('mouseenter', () => {
        const label = node.getAttribute('data-label');
        const val = node.getAttribute('data-val');
        tooltip.textContent = `${label}: ${val}`;
        const rect = node.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        tooltip.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
        tooltip.style.top = `${Math.max(24, rect.top - parentRect.top)}px`;
        tooltip.style.opacity = '1';
      });
      node.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
      });
    });
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
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    const segments = statuses.map((s) => {
      const count = flights.filter((f) => f.status === s.key).length;
      const frac = count / total;
      const len = frac * circumference;
      const seg = count > 0
        ? `<circle cx="80" cy="80" r="${radius}" fill="none" stroke="${s.color}" stroke-width="20" stroke-dasharray="${len} ${circumference - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 80 80)" />`
        : '';
      offset += len;
      return { ...s, count, seg };
    });

    el.innerHTML = `
      <div class="donut-svg-wrap">
        <svg viewBox="0 0 160 160" width="160" height="160">
          <circle cx="80" cy="80" r="${radius}" fill="none" stroke="var(--bg-subtle)" stroke-width="20" />
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

  /* ---------- Page Renderers ---------- */
  function initDashboard() {
    const kpiContainer = document.getElementById('dashboardKpis');
    const totalRevenue = state.payments
      .filter((p) => p.status === 'Paid')
      .reduce((acc, p) => acc + Number(p.amount), 0);
    const delayedCount = state.flights.filter((f) => f.status === 'Delayed').length;

    const kpis = [
      { icon: ICONS.plane, tone: 'blue', trend: '↑ +5', dir: 'up', value: state.flights.length, label: 'Total Flights' },
      { icon: ICONS.plane, tone: 'teal', trend: '↑ +2', dir: 'up', value: state.flights.filter((f) => f.scheduleGroup === 'today').length, label: "Today's Flights" },
      { icon: ICONS.ticket, tone: 'green', trend: '↑ +12%', dir: 'up', value: state.bookings.length, label: 'Total Bookings' },
      { icon: ICONS.ticket, tone: 'amber', trend: '↑ +8%', dir: 'up', value: state.bookings.filter((b) => b.date.startsWith('2026-09-04')).length, label: "Today's Bookings" },
      { icon: ICONS.users, tone: 'blue', trend: '↑ +3', dir: 'up', value: state.customers.length, label: 'Total Customers' },
      { icon: ICONS.userPlus, tone: 'teal', trend: '↑ +1', dir: 'up', value: state.employees.length, label: 'Total Employees' },
      { icon: ICONS.dollar, tone: 'green', trend: '↑ +18%', dir: 'up', value: formatMoney(totalRevenue), label: 'Total Revenue' },
      { icon: ICONS.alert, tone: 'red', trend: '↓ -1', dir: 'down', value: delayedCount, label: 'Delayed Flights' }
    ];

    if (kpiContainer) {
      kpiContainer.innerHTML = kpis.map((k) => `
        <div class="kpi-card">
          <div class="kpi-top">
            <div class="kpi-icon-box ${k.tone}">${k.icon}</div>
            <span class="kpi-trend ${k.dir}">${k.trend}</span>
          </div>
          <div>
            <div class="kpi-value tabular-nums">${escapeHtml(k.value)}</div>
            <div class="kpi-label">${escapeHtml(k.label)}</div>
          </div>
        </div>
      `).join('');
    }

    renderBarChart('bookingTrendsChart', state.charts.bookingTrends);
    renderDonutChart('flightStatusDonut', state.flights);
    renderAreaChart('revenueTrendsChart', state.charts.revenueTrends, '#16a34a', 'revGreenGrad');

    const cancelledEl = document.getElementById('cancelledFlightsList');
    if (cancelledEl) {
      const cancelled = state.flights.filter((f) => f.status === 'Cancelled');
      cancelledEl.innerHTML = cancelled.length
        ? cancelled.map((f) => `
          <div class="cancelled-item">
            <div class="cancelled-left">
              <div class="cancelled-icon">${ICONS.alert}</div>
              <div>
                <div class="cell-primary">${escapeHtml(f.id)}</div>
                <div class="cell-sub">${escapeHtml(f.from)} — ${escapeHtml(f.to)}</div>
              </div>
            </div>
            ${statusBadge('Cancelled')}
          </div>
        `).join('')
        : '<div class="empty-state">No cancelled flights</div>';
    }

    const recentBookingsEl = document.getElementById('recentBookingsList');
    if (recentBookingsEl) {
      recentBookingsEl.innerHTML = state.bookings.slice(0, 5).map((b) => `
        <div class="recent-row">
          <div class="recent-row-left">
            <div class="ticket-icon-box">${ICONS.ticket}</div>
            <div>
              <div class="cell-primary mono-id">${escapeHtml(b.ref)}</div>
              <div class="cell-sub">${escapeHtml(b.customer)} — ${escapeHtml(b.flight)}</div>
            </div>
          </div>
          ${statusBadge(b.bookingStatus)}
        </div>
      `).join('');
    }

    const activitiesEl = document.getElementById('recentActivitiesList');
    if (activitiesEl) {
      activitiesEl.innerHTML = state.activities.slice(0, 6).map((a) => `
        <div class="recent-row">
          <div class="recent-row-left">
            <div class="activity-avatar" style="background:${escapeHtml(a.color)}">${escapeHtml(a.initials)}</div>
            <div>
              <div class="activity-text">
                <strong>${escapeHtml(a.actor)}</strong> ${escapeHtml(a.action)}
                <span class="activity-target">${escapeHtml(a.target)}</span>
              </div>
              <div class="cell-sub">${escapeHtml(a.time)}</div>
            </div>
          </div>
        </div>
      `).join('');
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

  function initCustomers() {
    const tbody = document.getElementById('customersTableBody');

    function render() {
      tbody.innerHTML = state.customers.map((c) => `
        <tr>
          <td>
            <div class="customer-name-cell">
              <div class="customer-avatar">${escapeHtml(c.initials)}</div>
              <span class="cell-primary">${escapeHtml(c.name)}</span>
            </div>
          </td>
          <td>${escapeHtml(c.email)}</td>
          <td class="tabular-nums">${escapeHtml(c.phone)}</td>
          <td class="cell-primary tabular-nums">${c.bookings}</td>
          <td>${escapeHtml(c.country)}</td>
          <td>${statusBadge(c.status)}</td>
          <td>
            <div class="actions-cell">
              <button type="button" class="action-icon-btn" data-view-customer="${escapeHtml(c.id)}" title="View customer">${ICONS.eye}</button>
              <button type="button" class="action-icon-btn ${c.status === 'Active' ? 'danger' : 'success'}" data-toggle-customer="${escapeHtml(c.id)}" title="${c.status === 'Active' ? 'Block customer' : 'Unblock customer'}">
                ${c.status === 'Active' ? ICONS.ban : ICONS.checkCircle}
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    render();

    tbody.addEventListener('click', (e) => {
      const viewBtn = e.target.closest('[data-view-customer]');
      const toggleBtn = e.target.closest('[data-toggle-customer]');

      if (viewBtn) {
        const c = state.customers.find((item) => item.id === viewBtn.getAttribute('data-view-customer'));
        if (c) {
          openDetailModal(c.name, [
            ['Customer ID', escapeHtml(c.id)],
            ['Status', statusBadge(c.status)],
            ['Email', escapeHtml(c.email)],
            ['Phone', escapeHtml(c.phone)],
            ['Country', escapeHtml(c.country)],
            ['Total Bookings', String(c.bookings)]
          ]);
        }
      } else if (toggleBtn) {
        const c = state.customers.find((item) => item.id === toggleBtn.getAttribute('data-toggle-customer'));
        if (c) {
          c.status = c.status === 'Active' ? 'Blocked' : 'Active';
          saveState();
          render();
          showToast(`${c.name} is now ${c.status}`);
        }
      }
    });
  }

  function initEmployees() {
    const tbody = document.getElementById('employeesTableBody');
    const addBtn = document.getElementById('openAddEmployeeBtn');
    const form = document.getElementById('employeeForm');
    const avatarColors = ['#2563EB', '#0D9488', '#16A34A', '#EA580C', '#DC2626', '#0891B2'];

    function render() {
      tbody.innerHTML = state.employees.map((emp) => `
        <tr>
          <td>
            <div class="employee-name-cell">
              <div class="employee-avatar" style="background:${escapeHtml(emp.color)}">${escapeHtml(emp.initials)}</div>
              <span class="cell-primary">${escapeHtml(emp.name)}</span>
            </div>
          </td>
          <td>${escapeHtml(emp.email)}</td>
          <td>${escapeHtml(emp.role)}</td>
          <td>${escapeHtml(emp.department)}</td>
          <td>${statusBadge(emp.status)}</td>
          <td>
            <div class="actions-cell">
              <button type="button" class="action-icon-btn" data-edit-emp="${escapeHtml(emp.id)}" title="Edit">${ICONS.edit}</button>
              <button type="button" class="action-icon-btn warn" data-toggle-emp="${escapeHtml(emp.id)}" title="Toggle Active/Inactive">${ICONS.power}</button>
              <button type="button" class="action-icon-btn danger" data-delete-emp="${escapeHtml(emp.id)}" title="Delete">${ICONS.trash}</button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    render();

    tbody.addEventListener('click', (e) => {
      const editBtn = e.target.closest('[data-edit-emp]');
      const toggleBtn = e.target.closest('[data-toggle-emp]');
      const delBtn = e.target.closest('[data-delete-emp]');

      if (editBtn) {
        const emp = state.employees.find((item) => item.id === editBtn.getAttribute('data-edit-emp'));
        if (emp) {
          document.getElementById('employeeModalTitle').textContent = 'Edit Employee';
          document.getElementById('employeeSubmitBtn').textContent = 'Save Changes';
          document.getElementById('employeeEditId').value = emp.id;
          document.getElementById('employeeNameInput').value = emp.name;
          document.getElementById('employeeEmailInput').value = emp.email;
          document.getElementById('employeePhoneInput').value = emp.phone || '';
          document.getElementById('employeeRoleInput').value = emp.role;
          document.getElementById('employeeDeptInput').value = emp.department;
          openModal('employeeModal');
        }
      } else if (toggleBtn) {
        const emp = state.employees.find((item) => item.id === toggleBtn.getAttribute('data-toggle-emp'));
        if (emp) {
          emp.status = emp.status === 'Active' ? 'Inactive' : 'Active';
          saveState();
          render();
          showToast(`${emp.name} marked ${emp.status}`);
        }
      } else if (delBtn) {
        const id = delBtn.getAttribute('data-delete-emp');
        const target = state.employees.find((item) => item.id === id);
        state.employees = state.employees.filter((item) => item.id !== id);
        saveState();
        render();
        showToast(`${target ? target.name : 'Employee'} removed`);
      }
    });

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('employeeEditId').value = '';
        document.getElementById('employeeModalTitle').textContent = 'Add Employee';
        document.getElementById('employeeSubmitBtn').textContent = 'Add Employee';
        openModal('employeeModal');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('employeeEditId').value;
        const name = document.getElementById('employeeNameInput').value.trim();
        const email = document.getElementById('employeeEmailInput').value.trim();
        const phone = document.getElementById('employeePhoneInput').value.trim();
        const role = document.getElementById('employeeRoleInput').value;
        const department = document.getElementById('employeeDeptInput').value.trim() || role;

        if (editId) {
          const emp = state.employees.find((item) => item.id === editId);
          if (emp) {
            emp.name = name;
            emp.initials = getInitials(name);
            emp.email = email;
            emp.phone = phone;
            emp.role = role;
            emp.department = department;
            showToast(`Updated ${name}`);
          }
        } else {
          const nextNum = state.employees.length + 1;
          state.employees.push({
            id: `EMP-${String(nextNum).padStart(2, '0')}`,
            initials: getInitials(name),
            color: avatarColors[nextNum % avatarColors.length],
            name,
            email,
            phone,
            role,
            department,
            status: 'Active'
          });
          showToast(`Added ${name} to staff`);
        }

        saveState();
        closeModal('employeeModal');
        render();
      });
    }
  }

  function initPayments() {
    const tbody = document.getElementById('paymentsTableBody');

    function render() {
      tbody.innerHTML = state.payments.map((p) => `
        <tr>
          <td class="mono-id">${escapeHtml(p.id)}</td>
          <td><a href="bookings.html" class="link-blue mono-id">${escapeHtml(p.booking)}</a></td>
          <td class="cell-primary">${escapeHtml(p.customer)}</td>
          <td class="cell-primary tabular-nums">${formatMoney(p.amount)}</td>
          <td class="payment-method-cell">${escapeHtml(p.method)}</td>
          <td>${statusBadge(p.status)}</td>
          <td class="tabular-nums">${escapeHtml(p.date)}</td>
          <td>
            <div class="actions-cell">
              <button type="button" class="action-icon-btn" data-view-pay="${escapeHtml(p.id)}" title="View">${ICONS.eye}</button>
              ${p.status === 'Paid' ? `<button type="button" class="action-icon-btn warn" data-refund-pay="${escapeHtml(p.id)}" title="Issue refund">${ICONS.refund}</button>` : ''}
              ${p.status === 'Pending' ? `<button type="button" class="action-icon-btn success" data-approve-pay="${escapeHtml(p.id)}" title="Mark paid">${ICONS.checkCircle}</button>` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    }

    render();

    tbody.addEventListener('click', (e) => {
      const viewBtn = e.target.closest('[data-view-pay]');
      const refundBtn = e.target.closest('[data-refund-pay]');
      const approveBtn = e.target.closest('[data-approve-pay]');

      if (viewBtn) {
        const p = state.payments.find((item) => item.id === viewBtn.getAttribute('data-view-pay'));
        if (p) {
          openDetailModal(`Payment ${p.id}`, [
            ['Booking Ref', escapeHtml(p.booking)],
            ['Customer', escapeHtml(p.customer)],
            ['Amount', formatMoney(p.amount)],
            ['Method', escapeHtml(p.method)],
            ['Status', statusBadge(p.status)],
            ['Date', escapeHtml(p.date)]
          ]);
        }
      } else if (approveBtn) {
        const p = state.payments.find((item) => item.id === approveBtn.getAttribute('data-approve-pay'));
        if (p) {
          p.status = 'Paid';
          saveState();
          render();
          showToast(`Payment ${p.id} marked as Paid`);
        }
      } else if (refundBtn) {
        const p = state.payments.find((item) => item.id === refundBtn.getAttribute('data-refund-pay'));
        if (p) {
          p.status = 'Refunded';
          saveState();
          render();
          showToast(`Refund issued for ${p.id}`);
        }
      }
    });
  }

  function initRevenue() {
    const kpiEl = document.getElementById('revenueKpis');
    if (kpiEl) {
      const cards = [
        { icon: ICONS.dollar, tone: 'green', value: '$2,810', label: 'Daily Revenue' },
        { icon: ICONS.calendar, tone: 'blue', value: '$2,800', label: 'Weekly Revenue' },
        { icon: ICONS.trendUp, tone: 'teal', value: '$15,300', label: 'Monthly Revenue' },
        { icon: ICONS.wallet, tone: 'amber', value: '$3,543,000', label: 'Total Revenue' }
      ];
      kpiEl.innerHTML = cards.map((c) => `
        <div class="revenue-kpi-card">
          <div class="rev-icon-box ${c.tone}">${c.icon}</div>
          <div>
            <div class="rev-value tabular-nums">${c.value}</div>
            <div class="rev-label">${c.label}</div>
          </div>
        </div>
      `).join('');
    }

    renderAreaChart('revMonthlyChart', state.charts.revenueTrends, '#16a34a', 'revMonthlyGrad');
    renderAreaChart('revWeeklyChart', state.charts.dailyRevenue, '#2563eb', 'revWeeklyGrad');
  }

  function initRefunds() {
    const tbody = document.getElementById('refundsTableBody');

    function render() {
      tbody.innerHTML = state.refunds.map((r) => `
        <tr>
          <td class="mono-id">${escapeHtml(r.id)}</td>
          <td><a href="bookings.html" class="link-blue mono-id">${escapeHtml(r.booking)}</a></td>
          <td class="cell-primary">${escapeHtml(r.customer)}</td>
          <td class="cell-primary tabular-nums">${formatMoney(r.amount)}</td>
          <td class="reason-cell">${escapeHtml(r.reason)}</td>
          <td>${statusBadge(r.status)}</td>
          <td class="tabular-nums">${escapeHtml(r.date)}</td>
          <td>
            <div class="actions-cell">
              <button type="button" class="action-icon-btn" data-view-ref="${escapeHtml(r.id)}" title="View">${ICONS.eye}</button>
              ${r.status === 'Pending' ? `
                <button type="button" class="action-icon-btn success" data-approve-ref="${escapeHtml(r.id)}" title="Approve">${ICONS.checkCircle}</button>
                <button type="button" class="action-icon-btn danger" data-reject-ref="${escapeHtml(r.id)}" title="Reject">${ICONS.xCircle}</button>
              ` : ''}
              ${r.status === 'Approved' ? `
                <button type="button" class="action-icon-btn success" data-process-ref="${escapeHtml(r.id)}" title="Mark Processed">${ICONS.checkCircle}</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    }

    render();

    tbody.addEventListener('click', (e) => {
      const viewBtn = e.target.closest('[data-view-ref]');
      const approveBtn = e.target.closest('[data-approve-ref]');
      const rejectBtn = e.target.closest('[data-reject-ref]');
      const processBtn = e.target.closest('[data-process-ref]');

      if (viewBtn) {
        const r = state.refunds.find((item) => item.id === viewBtn.getAttribute('data-view-ref'));
        if (r) {
          openDetailModal(`Refund ${r.id}`, [
            ['Booking Ref', escapeHtml(r.booking)],
            ['Customer', escapeHtml(r.customer)],
            ['Amount', formatMoney(r.amount)],
            ['Status', statusBadge(r.status)],
            ['Date', escapeHtml(r.date)],
            ['Reason', escapeHtml(r.reason)]
          ]);
        }
      } else if (approveBtn) {
        const r = state.refunds.find((item) => item.id === approveBtn.getAttribute('data-approve-ref'));
        if (r) {
          r.status = 'Approved';
          saveState();
          render();
          showToast(`Refund ${r.id} approved`);
        }
      } else if (rejectBtn) {
        const r = state.refunds.find((item) => item.id === rejectBtn.getAttribute('data-reject-ref'));
        if (r) {
          r.status = 'Rejected';
          saveState();
          render();
          showToast(`Refund ${r.id} rejected`, 'error');
        }
      } else if (processBtn) {
        const r = state.refunds.find((item) => item.id === processBtn.getAttribute('data-process-ref'));
        if (r) {
          r.status = 'Processed';
          saveState();
          render();
          showToast(`Refund ${r.id} marked as Processed`);
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
        const depTime = (f.departure.split(' ')[1] || '08:00');
        const arrTime = (f.arrival.split(' ')[1] || '10:30');
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

  function initReports() {
    const grid = document.getElementById('reportsGrid');
    const exportBtn = document.getElementById('exportReportBtn');
    let currentReportCsv = '';
    let currentReportFilename = 'report.csv';

    const reports = [
      {
        id: 'booking',
        title: 'Booking Report',
        desc: 'Overview of all bookings, statuses, and passenger counts.',
        icon: ICONS.ticket,
        tone: 'blue'
      },
      {
        id: 'revenue',
        title: 'Revenue Report',
        desc: 'Revenue breakdown by payment method and status.',
        icon: ICONS.dollar,
        tone: 'green'
      },
      {
        id: 'performance',
        title: 'Flight Performance Report',
        desc: 'On-time performance, delays, and completions.',
        icon: ICONS.plane,
        tone: 'teal'
      },
      {
        id: 'cancellation',
        title: 'Cancellation Report',
        desc: 'Cancelled bookings and refund impact analysis.',
        icon: ICONS.xCircle,
        tone: 'red'
      }
    ];

    grid.innerHTML = reports.map((r) => `
      <div class="report-card">
        <div class="report-card-top">
          <div class="report-icon-box ${r.tone}">${r.icon}</div>
          <div>
            <h2 class="report-title">${escapeHtml(r.title)}</h2>
            <p class="report-desc">${escapeHtml(r.desc)}</p>
          </div>
        </div>
        <div class="report-card-actions">
          <button type="button" class="btn btn-outline" data-generate-report="${r.id}">
            ${ICONS.doc}
            Generate Report
          </button>
        </div>
      </div>
    `).join('');

    function openReportModal(type) {
      const titleEl = document.getElementById('reportModalTitle');
      const bodyEl = document.getElementById('reportModalBody');
      let headers = [];
      let rows = [];

      if (type === 'booking') {
        titleEl.textContent = 'Booking Report';
        currentReportFilename = 'flyra-booking-report.csv';
        headers = ['REF', 'CUSTOMER', 'FLIGHT', 'PASSENGERS', 'TOTAL', 'STATUS'];
        rows = state.bookings.map((b) => ({
          cells: [
            `<span class="link-blue mono-id">${escapeHtml(b.ref)}</span>`,
            escapeHtml(b.customer),
            escapeHtml(b.flight),
            `<span class="tabular-nums">${b.passengers}</span>`,
            `<span class="cell-primary tabular-nums">${formatMoney(b.totalPrice)}</span>`,
            statusBadge(b.bookingStatus)
          ],
          raw: [b.ref, b.customer, b.flight, b.passengers, `$${b.totalPrice}`, b.bookingStatus]
        }));
      } else if (type === 'revenue') {
        titleEl.textContent = 'Revenue Report';
        currentReportFilename = 'flyra-revenue-report.csv';
        headers = ['PAYMENT ID', 'BOOKING', 'CUSTOMER', 'METHOD', 'AMOUNT', 'STATUS'];
        rows = state.payments.map((p) => ({
          cells: [
            `<span class="mono-id">${escapeHtml(p.id)}</span>`,
            `<span class="link-blue mono-id">${escapeHtml(p.booking)}</span>`,
            escapeHtml(p.customer),
            escapeHtml(p.method),
            `<span class="cell-primary tabular-nums">${formatMoney(p.amount)}</span>`,
            statusBadge(p.status)
          ],
          raw: [p.id, p.booking, p.customer, p.method, `$${p.amount}`, p.status]
        }));
      } else if (type === 'performance') {
        titleEl.textContent = 'Flight Performance Report';
        currentReportFilename = 'flyra-flight-performance.csv';
        headers = ['FLIGHT', 'ROUTE', 'AIRCRAFT', 'SEATS', 'STATUS'];
        rows = state.flights.map((f) => ({
          cells: [
            `<span class="link-blue mono-id">${escapeHtml(f.id)}</span>`,
            `${escapeHtml(f.from)} → ${escapeHtml(f.to)}`,
            escapeHtml(f.aircraft || 'Airbus A320'),
            `<span class="tabular-nums">${f.availableSeats}/${f.totalSeats}</span>`,
            statusBadge(f.status)
          ],
          raw: [f.id, `${f.from} -> ${f.to}`, f.aircraft || 'Airbus A320', `${f.availableSeats}/${f.totalSeats}`, f.status]
        }));
      } else {
        titleEl.textContent = 'Cancellation Report';
        currentReportFilename = 'flyra-cancellation-report.csv';
        headers = ['REFUND ID', 'BOOKING', 'CUSTOMER', 'AMOUNT', 'REASON', 'STATUS'];
        rows = state.refunds.map((r) => ({
          cells: [
            `<span class="mono-id">${escapeHtml(r.id)}</span>`,
            `<span class="link-blue mono-id">${escapeHtml(r.booking)}</span>`,
            escapeHtml(r.customer),
            `<span class="cell-primary tabular-nums">${formatMoney(r.amount)}</span>`,
            escapeHtml(r.reason),
            statusBadge(r.status)
          ],
          raw: [r.id, r.booking, r.customer, `$${r.amount}`, r.reason, r.status]
        }));
      }

      currentReportCsv = [
        headers.join(','),
        ...rows.map((r) => r.raw.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      bodyEl.innerHTML = `
        <div class="table-scroll">
          <table class="data-table">
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rows.map((r) => `<tr>${r.cells.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      `;
      openModal('reportModal');
    }

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-generate-report]');
      if (btn) openReportModal(btn.getAttribute('data-generate-report'));
    });

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const blob = new Blob([currentReportCsv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentReportFilename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showToast(`Exported ${currentReportFilename}`);
      });
    }
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

      if (!items.length) {
        listEl.innerHTML = '<div class="empty-state">No notifications in this category.</div>';
        return;
      }

      listEl.innerHTML = items.map((n) => `
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
      `).join('');
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
        state.notifications.forEach((n) => {
          n.unread = false;
        });
        saveState();
        render();
        showToast('All notifications marked as read');
      });
    }
  }

  function initProfile() {
    function renderProfileCard() {
      const p = state.profile;
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
        const p = state.profile;
        document.getElementById('editProfileName').value = p.name;
        document.getElementById('editProfileEmail').value = p.email;
        document.getElementById('editProfilePhone').value = p.phone;
        document.getElementById('editProfileDept').value = p.department;
        openModal('editProfileModal');
      });
    }

    if (editForm) {
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('editProfileName').value.trim();
        state.profile.name = name;
        state.profile.initials = getInitials(name);
        state.profile.email = document.getElementById('editProfileEmail').value.trim();
        state.profile.phone = document.getElementById('editProfilePhone').value.trim();
        state.profile.department = document.getElementById('editProfileDept').value.trim();
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
      customers: initCustomers,
      employees: initEmployees,
      payments: initPayments,
      revenue: initRevenue,
      refunds: initRefunds,
      'flight-schedule': initFlightSchedule,
      reports: initReports,
      notifications: initNotifications,
      profile: initProfile
    };

    if (handlers[page]) {
      handlers[page]();
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
