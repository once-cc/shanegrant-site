import React, { useEffect, useRef, useState } from 'react';
import { ACCOLADES } from '../constants';

interface CVDownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CVDownloadModal: React.FC<CVDownloadModalProps> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadComplete, setDownloadComplete] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'service' | 'quals'>('overview');
    const [timelineHasAnimated, setTimelineHasAnimated] = useState(false);

    // Initial animation trigger for service tab using requestAnimationFrame
    useEffect(() => {
        if (activeTab === 'service' && !timelineHasAnimated) {
            requestAnimationFrame(() => {
                setTimelineHasAnimated(true);
            });
        }
    }, [activeTab, timelineHasAnimated]);

    // Reset timeline animation and active tab on modal close
    useEffect(() => {
        if (!isOpen) {
            setTimelineHasAnimated(false);
            setActiveTab('overview');
        }
    }, [isOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setDownloadComplete(false);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const CV_URL = '/shanegrant-cv.pdf';

    const handleDownload = () => {
        setIsDownloading(true);

        const link = document.createElement('a');
        link.href = CV_URL;
        link.download = 'Shane_Grant_CV.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();

        setTimeout(() => {
            setIsDownloading(false);
            setDownloadComplete(true);
        }, 1500);
    };

    if (!isOpen) return null;

    const serviceTimeline = [
        { period: '2012 — 2020', role: 'Security Guard', unit: 'NZDF — Trentham Military Camp', active: true },
        { period: '2004 — 2010', role: 'Lance Corporal', unit: 'Royal NZ Army Logistic Regiment', active: false },
        { period: '1990 — 2004', role: 'Territorial Force', unit: 'RNZIR & Engineers', active: false },
    ];

    const coreCapabilities = [
        'Access Control & Perimeter Security',
        'CCTV & Electronic Monitoring',
        'Incident Response & De-escalation',
        'VIP Protection & Transport',
        'Secure Asset Handling',
        'SOP-Driven Operations',
    ];

    const qualifications = [
        { title: 'NZ Certificate Level 4 (Music)', institution: 'Southern Institute of Technology' },
        { title: 'NZDF Security Vetting — SECRET', institution: 'Previously held & verified' },
        { title: 'Class 1 NZ Driver Licence', institution: 'Full Clean Licence' },
        { title: 'First Aid Certified', institution: 'Maintained during security tenure' },
    ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Download CV"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[rgba(10,14,20,0.45)] backdrop-blur-[16px] animate-fade-in" />

            {/* Modal Container */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[20px] flex flex-col bg-[rgba(255,255,255,0.78)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.35)] shadow-[0_10px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] animate-fade-in origin-center modal-scroll"
                style={{
                    animationDuration: '0.14s',
                    animationTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                    animationName: 'scale-in'
                }}
            >
                {/* ─── Professional Header ─── */}
                <div className="px-5 py-6 sm:px-8 sm:py-8 flex items-center justify-between bg-gradient-to-b from-[rgba(15,20,28,0.75)] to-[rgba(15,20,28,0.55)] backdrop-blur-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-display font-bold text-white tracking-[0.04em]">Curriculum Vitae</h2>
                        <p className="text-sm text-white/60 font-body font-medium mt-0.5">Shane Grant — Security Professional</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm cursor-pointer"
                        aria-label="Close modal"
                    >
                        <span className="material-icons text-white/60 hover:text-white text-lg">close</span>
                    </button>
                </div>

                {/* ─── Tab Navigation ─── */}
                <div className="border-b border-border-neutral px-5 sm:px-8 flex gap-8 bg-off-white/30 relative z-20 flex-shrink-0">
                    {([
                        { key: 'overview', label: 'Overview' },
                        { key: 'service', label: 'Service History' },
                        { key: 'quals', label: 'Qualifications' },
                    ] as const).map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`
                py-4 text-xs uppercase tracking-wider cursor-pointer
                border-b-2 transition-all duration-120 ease-out
                ${activeTab === tab.key
                                    ? 'border-charcoal text-charcoal font-bold border-b-[2px]'
                                    : 'border-transparent text-battleship-gray hover:text-charcoal hover:tracking-[0.07em] hover:opacity-90 font-medium'
                                }
              `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ─── Tab Content ─── */}
                <div className="relative bg-transparent">

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-5 sm:gap-7">
                            {/* Profile Header */}
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-charcoal rounded-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <span className="material-icons text-white text-2xl">shield</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-charcoal tracking-tight">
                                        Shane Grant
                                    </h3>
                                    <p className="text-sm text-battleship-gray font-bold uppercase tracking-wider mt-1">
                                        Security & Protective Services Professional
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="material-icons text-[14px] text-battleship-gray">place</span>
                                        <p className="text-sm text-charcoal-light font-medium">
                                            Paraparaumu, Wellington Region
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Professional Summary */}
                            <div className="bg-off-white p-6 rounded-sm border border-border-neutral relative overflow-visible transition-all duration-140 ease-out hover:bg-[rgba(255,255,255,0.86)] hover:shadow-[0_12px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] hover:border-transparent">
                                {/* Accolades Overlay - Restored */}
                                <div className="absolute -top-6 -right-4 flex items-center z-20 pointer-events-auto">
                                    {ACCOLADES.map((item, index) => (
                                        <div
                                            key={`modal-accolade-${item.id}`}
                                            className={`relative transform transition-all duration-300 hover:scale-110 hover:z-50 ${index % 2 === 0 ? 'translate-y-1' : '-translate-y-1'}`}
                                            style={{ marginLeft: index === 0 ? 0 : '-12px' }}
                                        >
                                            <img
                                                src={item.src}
                                                alt={item.title}
                                                className="h-11 w-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] opacity-92 scale-98"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-4">Professional Profile</h4>
                                <p className="text-base text-[#1A1A1A] leading-loose font-body">
                                    Defence-experienced security professional with <strong className="text-charcoal font-bold">30+ years</strong> of service within NZDF environments,
                                    including Regular Force, Territorial Force, and on-site Security Guard roles at Trentham Military Camp.
                                    Trusted to work unsupervised, apply Standard Operating Procedures, exercise lawful authority, and represent
                                    the Defence Force with professionalism, discretion, and integrity.
                                </p>
                            </div>

                            {/* Core Capabilities Grid */}
                            <div>
                                <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-4">Core Capabilities</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {coreCapabilities.map((cap, i) => (
                                        <div
                                            key={cap}
                                            className="flex items-center gap-2 bg-white border border-border-neutral px-3 py-2.5 rounded-sm transition-all duration-140 ease-out hover:bg-[rgba(255,255,255,0.86)] hover:shadow-[0_12px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] hover:border-transparent"
                                        >
                                            <span className="w-1.5 h-1.5 bg-charcoal rounded-full flex-shrink-0" />
                                            <span className="text-xs text-charcoal font-medium leading-tight">{cap}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Service Record Tab */}
                    {activeTab === 'service' && (
                        <div className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-5 sm:gap-7">
                            <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Defence & Security Timeline</h4>
                            <div className="border-l border-transparent pl-6 sm:pl-8 flex flex-col gap-5 sm:gap-7 relative">
                                {/* Vertical Line with Animation */}
                                <div className="absolute left-0 top-1 bottom-0 w-px bg-transparent">
                                    <div className="absolute inset-0 bg-border-neutral opacity-30"></div>
                                    <div
                                        className="absolute top-0 left-0 w-full h-full bg-charcoal origin-top transition-transform duration-[2375ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                                        style={{
                                            transform: timelineHasAnimated ? 'scaleY(1)' : 'scaleY(0)'
                                        }}
                                    />
                                </div>

                                {serviceTimeline.map((entry, i) => (
                                    <div key={entry.period} className="relative">
                                        {/* Timeline Dot */}
                                        <div
                                            className={`absolute -left-[29px] sm:-left-[37px] top-1 w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ease-out z-10 ${timelineHasAnimated ? 'bg-charcoal shadow-inner scale-100 delay-300' : 'bg-transparent scale-0'}`}
                                            style={{ transitionDelay: `${i * 150}ms` }}
                                        ></div>

                                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                                            <h4 className="font-display font-bold text-charcoal text-lg tracking-tight">
                                                {entry.role}
                                            </h4>
                                            <span className="font-mono text-xs text-battleship-gray font-medium">
                                                {entry.period}
                                            </span>
                                        </div>
                                        <p className="text-sm text-charcoal-light font-medium uppercase tracking-wide mb-3">{entry.unit}</p>

                                        {/* Expanded Details for most recent role */}
                                        {i === 0 && (
                                            <div className="bg-off-white p-3 sm:p-4 rounded-sm border border-border-neutral space-y-2 transition-all duration-140 ease-out hover:bg-[rgba(255,255,255,0.86)] hover:shadow-[0_12px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] hover:border-transparent">
                                                {[
                                                    '24/7 physical security for live military installation',
                                                    'Primary access-control authority at main entry points',
                                                    'CCTV, alarm, and electronic access monitoring',
                                                    'After-hours incident and emergency response',
                                                ].map((detail) => (
                                                    <div key={detail} className="flex items-start gap-2">
                                                        <span className="material-icons text-battleship-gray text-[10px] mt-1.5 font-bold">arrow_forward</span>
                                                        <span className="text-sm text-charcoal leading-relaxed">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Qualifications Tab */}
                    {activeTab === 'quals' && (
                        <div className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-5 sm:gap-7">
                            <div>
                                <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-3 sm:mb-4">Certifications</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {qualifications.map((qual, i) => (
                                        <div
                                            key={qual.title}
                                            className="flex items-center justify-between p-3 sm:p-4 bg-white border border-border-neutral rounded-sm transition-all duration-140 ease-out hover:bg-[rgba(255,255,255,0.86)] hover:shadow-[0_12px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] hover:border-transparent"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 bg-off-white rounded-full flex items-center justify-center flex-shrink-0 text-charcoal">
                                                    <span className="material-icons text-sm">
                                                        {i === 0 ? 'school' : i === 1 ? 'verified_user' : i === 2 ? 'drive_eta' : 'medical_services'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-display font-bold text-charcoal text-sm">
                                                        {qual.title}
                                                    </h4>
                                                    <p className="text-xs text-battleship-gray mt-0.5 font-medium">{qual.institution}</p>
                                                </div>
                                            </div>
                                            <span className="material-icons text-gray-300 text-sm">verified</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-3 sm:mb-4">Personal Attributes</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { attr: 'Calm Under Pressure', icon: 'psychology' },
                                        { attr: 'Strong Discipline', icon: 'gavel' },
                                        { attr: 'High Integrity', icon: 'verified' },
                                        { attr: 'Physically Resilient', icon: 'fitness_center' },
                                        { attr: 'Clear Communicator', icon: 'forum' },
                                        { attr: 'Independent Operator', icon: 'person' },
                                    ].map(({ attr }) => (
                                        <div key={attr} className="flex items-center gap-2 bg-off-white border border-border-neutral px-3 py-2 rounded-sm transition-all duration-140 ease-out hover:bg-[rgba(255,255,255,0.86)] hover:shadow-[0_12px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] hover:border-transparent">
                                            <span className="text-xs text-charcoal font-medium">{attr}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ─── Download Action Bar ─── */}
                <div className="px-5 sm:px-8 py-5 border-t border-[rgba(255,255,255,0.35)] flex items-center justify-between bg-transparent flex-shrink-0">
                    <span className="text-xs text-battleship-gray font-medium hidden sm:block">
                        Available in PDF format
                    </span>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-battleship-gray hover:text-charcoal transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>

                        {downloadComplete ? (
                            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm border border-green-200">
                                <span className="material-icons text-sm">check_circle</span>
                                Downloaded
                            </div>
                        ) : (
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="group relative bg-charcoal text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest overflow-hidden rounded-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-150 ease-out disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {isDownloading ? (
                                        <>
                                            <span className="material-icons text-sm animate-spin">refresh</span>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            Download CV
                                            <span className="material-icons text-sm ml-1 group-hover:translate-x-1 transition-transform duration-300">download</span>
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-charcoal-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVDownloadModal;
