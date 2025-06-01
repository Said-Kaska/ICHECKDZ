import { useState } from 'react';
import { CreditCard, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'baridimob',
    name: 'BaridiMob',
    logo: 'https://www.poste.dz/images/baridi-mob.png'
  },
  {
    id: 'cib',
    name: 'CIB',
    logo: 'https://www.poste.dz/images/cib.png'
  },
  {
    id: 'edahabia',
    name: 'Edahabia',
    logo: 'https://www.poste.dz/images/edahabia.png'
  },
  {
    id: 'visa',
    name: 'Visa/MasterCard',
    logo: 'https://www.poste.dz/images/visa-mastercard.png'
  }
];

const predefinedAmounts = [
  { credits: 50, amount: 1000 },
  { credits: 125, amount: 2500 },
  { credits: 250, amount: 5000 }
];

const PurchaseCredits = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentMethod || (!selectedAmount && !customAmount)) return;

    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowSuccess(true);
    setIsLoading(false);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedAmount(null);
      setCustomAmount('');
      setSelectedPaymentMethod(null);
    }, 3000);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recharger votre compte</h2>

          {showSuccess && (
            <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Paiement réussi! Vos crédits ont été ajoutés à votre compte.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Amount selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Sélectionnez le montant
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {predefinedAmounts.map(({ credits, amount }) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`
                      relative border rounded-lg p-5 cursor-pointer transition-all text-left
                      ${selectedAmount === amount 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{formatAmount(amount)}</p>
                        <p className="text-sm text-gray-600">{credits} crédits</p>
                      </div>
                      <div className="h-5 w-5 border-2 rounded-full flex items-center justify-center">
                        {selectedAmount === amount && (
                          <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ou entrez un montant personnalisé
                </label>
                <div className="max-w-xs">
                  <Input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Montant en DZD"
                    leftIcon={<span className="text-gray-500">DZD</span>}
                  />
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Méthode de paiement
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`
                      relative border rounded-lg p-4 cursor-pointer transition-all
                      ${selectedPaymentMethod === method.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <img 
                        src={method.logo} 
                        alt={method.name}
                        className="h-8 object-contain"
                      />
                      <div className="h-5 w-5 border-2 rounded-full flex items-center justify-center">
                        {selectedPaymentMethod === method.id && (
                          <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{method.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Security notice */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Paiement sécurisé</p>
                  <p>
                    Toutes les transactions sont sécurisées et cryptées. Vos informations de paiement ne sont jamais stockées sur nos serveurs.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading || (!selectedAmount && !customAmount) || !selectedPaymentMethod}
              isLoading={isLoading}
              fullWidth
              leftIcon={<Plus className="h-5 w-5" />}
            >
              {isLoading ? 'Traitement en cours...' : 'Procéder au paiement'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCredits;