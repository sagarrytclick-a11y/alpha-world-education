"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Search, Eye, Mail, Phone, Calendar, Edit, CheckCircle, RefreshCw, MapPin, ChevronDown, AlertCircle, ChevronRight, X, Menu } from 'lucide-react';
import { usePathname } from "next/navigation";
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";
import { useDropdownData } from "@/hooks/useDropdownData";
import { useCountryColleges } from "@/hooks/useCountryColleges";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [expandedMobileCountry, setExpandedMobileCountry] = useState<string | null>(null);
  const [showMobileColleges, setShowMobileColleges] = useState<string | null>(null);
  const [collegeSearch, setCollegeSearch] = useState('');
  const [countryCollegeSearch, setCountryCollegeSearch] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [showMobileSearchResults, setShowMobileSearchResults] = useState(false);
  const { emails, phones, address } = useContactInfo();
  const pathname = usePathname();
  const { openModal } = useFormModal();
  const { colleges, exams, countries, loading, error } = useDropdownData();
  
  // Use TanStack Query for country-specific colleges
  const { data: countryColleges = [], isLoading: loadingColleges, error: countryCollegesError } = useCountryColleges(hoveredCountry);
  const { data: mobileCountryColleges = [], isLoading: mobileLoadingColleges, error: mobileCountryCollegesError } = useCountryColleges(expandedMobileCountry);

  // Filter colleges based on search
  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  // Filter country colleges based on search
  const filteredCountryColleges = countryColleges.filter(college => 
    college.name.toLowerCase().includes(countryCollegeSearch.toLowerCase())
  );

  // Mobile search results for colleges and exams
  const mobileSearchResults = {
    colleges: colleges.filter(college => 
      college.name.toLowerCase().includes(mobileSearchQuery.toLowerCase())
    ),
    exams: exams.filter(exam => 
      exam.short_name.toLowerCase().includes(mobileSearchQuery.toLowerCase())
    )
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (hoveredItem === 'Countries' && !hoveredCountry) {
      // Set Germany as default country when Countries dropdown opens
      setHoveredCountry('germany');
    }
  }, [hoveredItem]);

  // Remove the old fetchCollegesByCountry function as it's now handled by useCountryColleges hook

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges", hasDropdown: true },
    { name: "Exams", href: "/exams", hasDropdown: true },
    { name: "Countries", href: "/countries", hasDropdown: true },
    { name: "Blog", href: "/blogs" },
    { name: "Services", href: "/service" },
    { name: "About", href: "/about" },
  ];

  const dropdownContent = {
    Colleges: colleges.map(c => ({ title: c.name, href: `/colleges/${c.slug}` })),
    Exams: exams.map(e => ({ title: e.short_name, href: `/exams/${e.slug}` })),
    Countries: countries.map(c => ({
      title: `Study in ${c.name}`,
      href: `/countries/${c.slug}`,
      flag: c.flag,
      slug: c.slug
    })),
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/98 backdrop-blur-lg shadow-xl" : "bg-white/90 backdrop-blur-sm shadow-sm"}`}>

      {/* TOP CONTACT BAR */}
      <div className="hidden bg-slate-900 text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3 text-sm">
          <div className="flex items-center gap-8">
            <a href={`tel:${phones.primaryRaw}`} className="flex items-center gap-2.5 hover:text-green-400 transition-colors"><Phone size={16} /><span className="font-medium">{phones.primary}</span></a>
            <a href={`mailto:${emails.info}`} className="flex items-center gap-2.5 hover:text-green-400 transition-colors"><Mail size={16} /><span className="font-medium">{emails.info}</span></a>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300"><MapPin size={16} /><span className="font-medium">{address.office}</span></div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex h-20 lg:h-24 items-center justify-between">
            <Link href="/" className="flex-shrink-0"><img src={SITE_IDENTITY.assets.logo.main} alt="Logo" width={80} height={80} className="hover:opacity-80 transition-opacity" /></Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative py-2"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => { 
                    setHoveredItem(null); 
                    setHoveredCountry(null);
                    // Clear search when dropdown closes
                    if (item.name === 'Colleges') {
                      setCollegeSearch('');
                    }
                    if (item.name === 'Countries') {
                      setCountryCollegeSearch('');
                    }
                  }}
                >
                  <Link href={item.href} className={`px-4 py-3 text-base font-semibold rounded-xl flex items-center gap-2 transition-all duration-200 ${isActive(item.href) ? "text-green-600 bg-green-50 shadow-sm" : "text-slate-700 hover:text-green-600 hover:bg-slate-50"}`}>
                    {item.name}
                    {item.hasDropdown && <ChevronDown size={16} className="transition-transform duration-200" />}
                  </Link>

                  {/* MAIN DROPDOWN - TWO COLUMN LAYOUT */}
                  {item.hasDropdown && hoveredItem === item.name && (
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-[60] ${item.name === 'Countries' ? 'w-[40rem] max-w-[80vw]' : 'w-80 max-w-[90vw]'}`}>
                      {loading && (item.name === 'Colleges' || item.name === 'Exams') ? (
                        <div className="px-6 py-4 text-slate-500 text-center">Loading...</div>
                      ) : error ? (
                        <div className="px-6 py-4 text-red-500 text-center flex flex-col items-center gap-2">
                          <AlertCircle size={16} />
                          <span className="text-sm">Failed to load data</span>
                        </div>
                      ) : item.name === 'Countries' ? (
                        <div className="flex h-full">
                          {/* LEFT COLUMN - COUNTRIES */}
                          <div className="w-1/2 border-r border-slate-100 overflow-y-auto custom-scrollbar max-h-[55vh]">
                            {dropdownContent[item.name as keyof typeof dropdownContent].map((dropdownItem: any) => (
                              <div
                                key={dropdownItem.title}
                                className="relative group"
                              >
                                <button
                                  onClick={() => {
                                    if (item.name === 'Countries') {
                                      setHoveredCountry(hoveredCountry === dropdownItem.slug ? null : dropdownItem.slug);
                                    }
                                  }}
                                  className={`w-full flex items-center justify-between px-4 py-2 text-sm font-bold transition-colors text-left ${hoveredCountry === dropdownItem.slug ? 'bg-green-50 text-green-600' : 'text-slate-700 hover:bg-green-50 hover:text-green-600'}`}
                                >
                                  <span className="flex items-center gap-2">
                                    {dropdownItem.flag && <span className="text-lg">{dropdownItem.flag}</span>}
                                    <span className="font-bold">{dropdownItem.title}</span>
                                  </span>
                                  {item.name === 'Countries' && <ChevronRight size={12} className="text-slate-400" />}
                                </button>

                                {/* GREEN SCROLL INDICATOR FOR ACTIVE COUNTRY */}
                                {item.name === 'Countries' && hoveredCountry === dropdownItem.slug && (
                                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-green-500 rounded-l-full"></div>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* RIGHT COLUMN - UNIVERSITIES */}
                          {item.name === 'Countries' && hoveredCountry && (
                            <div className="w-1/2 overflow-y-auto custom-scrollbar max-h-[55vh]">
                              <div className="px-4 pb-2 mb-2 border-b border-slate-100 sticky top-0 bg-white z-10">
                                <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Available Universities</span>
                              </div>

                              {/* Search Bar for Country Colleges */}
                              <div className="px-2 pb-3 sticky top-8 bg-white z-10">
                                <div className="relative">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                  <input
                                    type="text"
                                    placeholder="Search universities..."
                                    value={countryCollegeSearch}
                                    onChange={(e) => setCountryCollegeSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                  />
                                  {countryCollegeSearch && (
                                    <button
                                      onClick={() => setCountryCollegeSearch('')}
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="px-2">
                                {loadingColleges ? (
                                  <div className="px-4 py-3 text-sm text-slate-500 flex items-center gap-2 justify-center">
                                    <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="font-medium">Searching universities...</span>
                                  </div>
                                ) : countryCollegesError ? (
                                  <div className="px-4 py-8 text-center text-red-500">
                                    <AlertCircle size={20} className="mx-auto mb-2" />
                                    <p className="text-sm font-medium">Failed to load universities</p>
                                    <p className="text-xs mt-1">Please try again</p>
                                  </div>
                                ) : filteredCountryColleges.length > 0 ? (
                                  filteredCountryColleges.map((college) => (
                                    <Link key={college._id} href={`/colleges/${college.slug}`} className="block px-3 py-2 rounded-lg hover:bg-green-50/50 group/college transition-all duration-200 mb-1">
                                      <div className="font-bold text-sm text-slate-800 group-hover/college:text-green-700 transition-colors">{college.name}</div>
                                    </Link>
                                  ))
                                ) : countryCollegeSearch ? (
                                  <div className="px-4 py-8 text-center text-slate-500">
                                    <Search className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                                    <p className="text-sm font-medium">No universities found</p>
                                    <p className="text-xs mt-1">Try adjusting your search</p>
                                  </div>
                                ) : (
                                  <div className="px-4 py-8 text-center text-slate-400">
                                    <p className="text-sm font-medium">No universities found for this region.</p>
                                    <p className="text-xs mt-1">Try exploring other countries</p>
                                  </div>
                                )}
                              </div>

                              {countryColleges.length > 0 && (
                                <div className="px-4 mt-2 pt-2 border-t border-slate-100 sticky bottom-0 bg-white">
                                  <Link href={`/colleges?country=${hoveredCountry}`} className="block text-center py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all shadow-md shadow-green-100">
                                    Explore All Universities
                                  </Link>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        // SINGLE COLUMN FOR OTHER DROPDOWNS (Colleges, Exams)
                        <div className="overflow-y-auto custom-scrollbar max-h-[60vh]">
                          {/* Search Bar for Colleges */}
                          {item.name === 'Colleges' && (
                            <div className="sticky top-0 bg-white z-10 p-3 border-b border-slate-100">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                  type="text"
                                  placeholder="Search colleges..."
                                  value={collegeSearch}
                                  onChange={(e) => setCollegeSearch(e.target.value)}
                                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                {collegeSearch && (
                                  <button
                                    onClick={() => setCollegeSearch('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* College List */}
                          {(item.name === 'Colleges' ? filteredColleges : dropdownContent[item.name as keyof typeof dropdownContent]).map((dropdownItem: any) => (
                            <Link key={dropdownItem.title || dropdownItem.name} href={dropdownItem.href || `/colleges/${dropdownItem.slug}`} className="flex items-center justify-between px-4 py-2 text-sm font-bold text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors whitespace-nowrap">
                              <span className="flex items-center gap-2">
                                {dropdownItem.flag && <span className="text-lg">{dropdownItem.flag}</span>}
                                <span className="font-bold">{dropdownItem.title || dropdownItem.name}</span>
                              </span>
                            </Link>
                          ))}
                          
                          {/* No Results Message */}
                          {item.name === 'Colleges' && filteredColleges.length === 0 && collegeSearch && (
                            <div className="px-4 py-8 text-center text-slate-500">
                              <Search className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                              <p className="text-sm font-medium">No colleges found</p>
                              <p className="text-xs mt-1">Try adjusting your search</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <button onClick={openModal} className="hidden lg:block px-8 py-3 text-sm font-bold text-green-600 border-2 border-green-500 rounded-full hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md">
              Book Consultation
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden bg-white transition-all duration-300 ${isOpen ? "max-h-[calc(100vh-100px)] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-8 py-8 space-y-2">
          {/* MOBILE SEARCH BAR */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search colleges and exams..."
                value={mobileSearchQuery}
                onChange={(e) => {
                  setMobileSearchQuery(e.target.value);
                  setShowMobileSearchResults(e.target.value.length > 0);
                }}
                onFocus={() => setShowMobileSearchResults(mobileSearchQuery.length > 0)}
                className="w-full pl-12 pr-12 py-4 text-base border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50"
              />
              {mobileSearchQuery && (
                <button
                  onClick={() => {
                    setMobileSearchQuery('');
                    setShowMobileSearchResults(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {/* MOBILE SEARCH RESULTS */}
            {showMobileSearchResults && mobileSearchQuery && (
              <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="px-6 py-8 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <span className="text-sm font-medium">Searching...</span>
                  </div>
                ) : mobileSearchResults.colleges.length > 0 || mobileSearchResults.exams.length > 0 ? (
                  <div>
                    {/* COLLEGES SECTION */}
                    {mobileSearchResults.colleges.length > 0 && (
                      <div className="border-b border-slate-100">
                        <div className="px-4 py-3 bg-green-50 border-b border-green-100">
                          <span className="text-sm font-bold text-green-700 uppercase tracking-wider">Colleges ({mobileSearchResults.colleges.length})</span>
                        </div>
                        {mobileSearchResults.colleges.slice(0, 5).map((college) => (
                          <Link
                            key={college._id}
                            href={`/colleges/${college.slug}`}
                            onClick={() => {
                              setIsOpen(false);
                              setShowMobileSearchResults(false);
                              setMobileSearchQuery('');
                            }}
                            className="block px-4 py-3 hover:bg-green-50 transition-colors border-b border-slate-50"
                          >
                            <div className="font-semibold text-sm text-slate-800">{college.name}</div>
                          </Link>
                        ))}
                        {mobileSearchResults.colleges.length > 5 && (
                          <div className="px-4 py-2 bg-slate-50">
                            <Link
                              href={`/colleges?search=${encodeURIComponent(mobileSearchQuery)}`}
                              onClick={() => {
                                setIsOpen(false);
                                setShowMobileSearchResults(false);
                                setMobileSearchQuery('');
                              }}
                              className="text-xs font-bold text-green-600 hover:text-green-700"
                            >
                              View all {mobileSearchResults.colleges.length} colleges →
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* EXAMS SECTION */}
                    {mobileSearchResults.exams.length > 0 && (
                      <div>
                        <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
                          <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">Exams ({mobileSearchResults.exams.length})</span>
                        </div>
                        {mobileSearchResults.exams.slice(0, 5).map((exam) => (
                          <Link
                            key={exam._id}
                            href={`/exams/${exam.slug}`}
                            onClick={() => {
                              setIsOpen(false);
                              setShowMobileSearchResults(false);
                              setMobileSearchQuery('');
                            }}
                            className="block px-4 py-3 hover:bg-blue-50 transition-colors border-b border-slate-50"
                          >
                            <div className="font-semibold text-sm text-slate-800">{exam.short_name}</div>
                          </Link>
                        ))}
                        {mobileSearchResults.exams.length > 5 && (
                          <div className="px-4 py-2 bg-slate-50">
                            <Link
                              href={`/exams?search=${encodeURIComponent(mobileSearchQuery)}`}
                              onClick={() => {
                                setIsOpen(false);
                                setShowMobileSearchResults(false);
                                setMobileSearchQuery('');
                              }}
                              className="text-xs font-bold text-blue-600 hover:text-blue-700"
                            >
                              View all {mobileSearchResults.exams.length} exams →
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center text-slate-500">
                    <Search className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-medium">No results found</p>
                    <p className="text-xs mt-1">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {navItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setExpandedMobileItem(expandedMobileItem === item.name ? null : item.name)}
                    className={`w-full py-4 text-lg font-bold border-b border-slate-50 transition-colors flex items-center justify-between ${isActive(item.href) ? "text-green-600 bg-green-50" : "text-slate-800 hover:bg-slate-50"}`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-200 ${expandedMobileItem === item.name ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {/* MOBILE DROPDOWN CONTENT */}
                  {expandedMobileItem === item.name && (
                    <div className="bg-slate-50 border-b border-slate-100">
                      {loading && (item.name === 'Colleges' || item.name === 'Exams') ? (
                        <div className="px-6 py-4 text-slate-500 text-center">Loading...</div>
                      ) : error ? (
                        <div className="px-6 py-4 text-red-500 text-center flex flex-col items-center gap-2">
                          <AlertCircle size={16} />
                          <span className="text-sm">Failed to load data</span>
                        </div>
                      ) : item.name === 'Countries' ? (
                        <div className="max-h-60 overflow-y-auto">
                          {dropdownContent[item.name as keyof typeof dropdownContent].map((dropdownItem: any) => (
                            <div key={dropdownItem.title}>
                              <button
                                onClick={() => {
                                  setExpandedMobileCountry(dropdownItem.slug);
                                  setShowMobileColleges(showMobileColleges === dropdownItem.slug ? null : dropdownItem.slug);
                                }}
                                className={`w-full flex items-center justify-between px-6 py-3 text-sm font-bold transition-colors border-b border-slate-100 ${expandedMobileCountry === dropdownItem.slug ? 'bg-green-50 text-green-600' : 'text-slate-700 hover:bg-green-50 hover:text-green-600'}`}
                              >
                                <span className="flex items-center gap-2">
                                  {dropdownItem.flag && <span className="text-lg">{dropdownItem.flag}</span>}
                                  <span>{dropdownItem.title}</span>
                                </span>
                                <ChevronRight 
                                  size={16} 
                                  className={`transition-transform duration-200 ${expandedMobileCountry === dropdownItem.slug ? 'rotate-90' : ''}`}
                                />
                              </button>
                              
                              {/* MOBILE COUNTRY COLLEGES */}
                              {expandedMobileCountry === dropdownItem.slug && showMobileColleges === dropdownItem.slug && (
                                <div className="bg-white border-l-4 border-green-500">
                                  <div className="px-6 py-2 bg-green-50 border-b border-green-100">
                                    <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Universities in {dropdownItem.title.replace('Study in ', '')}</span>
                                  </div>
                                  
                                  {mobileLoadingColleges ? (
                                    <div className="px-6 py-4 text-sm text-slate-500 flex items-center gap-2 justify-center">
                                      <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                      <span className="font-medium">Loading universities...</span>
                                    </div>
                                  ) : mobileCountryCollegesError ? (
                                    <div className="px-6 py-4 text-center text-red-500">
                                      <AlertCircle size={16} className="mx-auto mb-1" />
                                      <p className="text-xs font-medium">Failed to load universities</p>
                                    </div>
                                  ) : mobileCountryColleges.length > 0 ? (
                                    mobileCountryColleges.slice(0, 5).map((college) => (
                                      <Link
                                        key={college._id}
                                        href={`/colleges/${college.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-6 py-2 text-xs font-bold text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors border-b border-slate-50"
                                      >
                                        {college.name}
                                      </Link>
                                    ))
                                  ) : (
                                    <div className="px-6 py-4 text-center text-slate-400">
                                      <p className="text-xs font-medium">No universities found</p>
                                    </div>
                                  )}
                                  
                                  {mobileCountryColleges.length > 0 && (
                                    <div className="px-6 py-2 bg-slate-50 border-t border-slate-100">
                                      <Link
                                        href={`/colleges?country=${expandedMobileCountry}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center py-2 text-xs font-bold text-green-600 bg-green-100 rounded-lg hover:bg-green-200 transition-all"
                                      >
                                        View All Universities
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="max-h-60 overflow-y-auto">
                          {dropdownContent[item.name as keyof typeof dropdownContent].map((dropdownItem: any) => (
                            <Link
                              key={dropdownItem.title}
                              href={dropdownItem.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-green-50 hover:text-green-600 transition-colors border-b border-slate-100"
                            >
                              {dropdownItem.flag && <span className="text-lg">{dropdownItem.flag}</span>}
                              <span>{dropdownItem.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-4 text-lg font-bold border-b border-slate-50 transition-colors ${isActive(item.href) ? "text-green-600 bg-green-50" : "text-slate-800 hover:bg-slate-50"}`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <button onClick={() => { openModal(); setIsOpen(false); }} className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all duration-200 mt-4">
            Book Consultation
          </button>
        </div>
      </div>
    </header>
  );
}