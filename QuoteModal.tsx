import React, { useState } from 'react';
import { CalculationData, LeadFormData } from '../types';
import { X } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculationData: CalculationData;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, calculationData }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    birthday: '',
    isSmoker: 'no',
    gender: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSmokerChange = (value: 'yes' | 'no') => {
    setFormData(prev => ({ ...prev, isSmoker: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock Webhook Payload
    const payload = {
      ...formData,
      calculation: calculationData
    };

    console.log('Sending to webhook:', payload);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Format currency
  const formattedAmount = new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    maximumFractionDigits: 0
  }).format(calculationData.totalProtectionNeeded);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-brand-cream rounded-[1.5rem] shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] relative">
        
        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors z-10"
        >
            <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          
          <div className="text-center mb-8">
            <h2 className="text-brand-green font-serif text-3xl mb-3">Save Your Quote</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Based on your inputs, you need approximately <br/>
              <span className="text-brand-orange font-bold text-lg">{formattedAmount}</span> in protection.
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="font-serif text-2xl text-brand-green mb-2">Thank you, {formData.name}!</h3>
              <p className="text-gray-600 text-sm">We've sent the detailed breakdown to your email.</p>
              <button 
                onClick={onClose}
                className="mt-8 px-6 py-3 bg-brand-green text-white rounded-lg font-medium hover:bg-opacity-90 transition-all w-full"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-white text-gray-800 placeholder-gray-400 transition-colors"
                  placeholder="Andrew Yap"
                />
              </div>

              {/* DOB & Gender Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Date of Birth</label>
                  <input 
                    type="date" 
                    name="birthday" 
                    required
                    value={formData.birthday} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-white text-gray-800 transition-colors"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Gender</label>
                   {/* Simplified to Input as per reference image appearance, though select is better for UX */}
                   <input 
                    type="text"
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange}
                    list="genders"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-white text-gray-800 transition-colors"
                    placeholder="Male"
                  />
                  <datalist id="genders">
                    <option value="Male" />
                    <option value="Female" />
                  </datalist>
                </div>
              </div>

              {/* Smoker Toggle */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Smoker?</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => handleSmokerChange('yes')}
                        className={`py-3 px-4 rounded-lg border flex items-center justify-start gap-3 transition-all ${formData.isSmoker === 'yes' ? 'bg-orange-50 border-brand-orange' : 'bg-white border-gray-300 hover:border-gray-400'}`}
                    >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.isSmoker === 'yes' ? 'border-brand-orange' : 'border-gray-400'}`}>
                            {formData.isSmoker === 'yes' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />}
                        </div>
                        <span className="text-gray-800">Yes</span>
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => handleSmokerChange('no')}
                        className={`py-3 px-4 rounded-lg border flex items-center justify-start gap-3 transition-all ${formData.isSmoker === 'no' ? 'bg-orange-50 border-brand-orange' : 'bg-white border-gray-300 hover:border-gray-400'}`}
                    >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.isSmoker === 'no' ? 'border-brand-orange' : 'border-gray-400'}`}>
                            {formData.isSmoker === 'no' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />}
                        </div>
                        <span className="text-gray-800">No</span>
                    </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-white text-gray-800 placeholder-gray-400 transition-colors"
                  placeholder="+60 12-345 6789"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none bg-white text-gray-800 placeholder-gray-400 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-brand-green text-white py-4 rounded-lg font-bold text-lg hover:bg-[#132e21] transition-colors shadow-lg flex items-center justify-center"
              >
                {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : 'Get Detailed Quote'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;