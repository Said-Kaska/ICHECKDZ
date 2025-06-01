import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, DollarSign, Plus, AlertCircle, CheckCircle, Calculator, Crown, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';

const CreditBalance = () => {
  const { user, updateUser } = useAuth();
  const [customAmount, setCustomAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRankInfo, setShowRankInfo] = useState(false);
  
  if (!user) {
    return <div>Loading...</div>;
  }

  const creditValue = 10; // 1 Credit = 10 DZA
  const minAmount = 1000; // Minimum purchase amount in DZA
  const customCredits = customAmount ? Math.floor(parseInt(customAmount) / creditValue) : 0;

  // Calculate user rank based on total credits used
  const getTotalCreditsUsed = () => {
    // This would normally come from the backend
    return 600; // Mock value for demonstration
  };

  const getUserRank = (creditsUsed: number) => {
    if (creditsUsed >= 1001) return { name: 'Enterprise', discount: 30 };
    if (creditsUsed >= 751) return { name: 'VIP', discount: 20 };
    if (creditsUsed >= 501) return { name: 'Premium', discount: 10 };
    return { name: 'Basic', discount: 0 };
  };

  const totalCreditsUsed = getTotalCreditsUsed();
  const userRank = getUserRank(totalCreditsUsed);
  
  const services = [
    { name: 'IMEI Check', credits: 5, price: 50 },
    { name: 'Device Registration', credits: 15, price: 150 },
    { name: 'Ownership Transfer', credits: 10, price: 100 }
  ];

  // Mock transaction history
  const transactions = [
    {
      id: '1',
      type: 'Credit Purchase',
      date: 'May 28, 2025',
      credits: 100,
      amount: 1000
    },
    {
      id: '2',
      type: 'Credit Purchase',
      date: 'May 15, 2025',
      credits: 200,
      amount: 2000
    },
    {
      id: '3',
      type: 'Credit Purchase',
      date: 'May 1, 2025',
      credits: 500,
      amount: 5000
    }
  ];
  
  const handleRecharge = async () => {
    if (!customAmount || parseInt(customAmount) < minAmount) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateUser({
      creditBalance: user.creditBalance + customCredits
    });
    
    setIsLoading(false);
    setShowSuccess(true);
    setCustomAmount('');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
  };
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Credit Balance & Payment</h1>
        <p className="text-gray-600 mt-2">
          Manage your credit balance and purchase credits for our services
        </p>
      </div>
      
      {showSuccess && (
        <div className="mb-8 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>Credits added successfully! Your new balance is {user.creditBalance} credits.</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Current balance */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Current Balance</h2>
            
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center">
                <DollarSign className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 mb-1">Available Credits</p>
              <p className="text-4xl font-bold text-blue-600">{user.creditBalance}</p>
              <p className="text-sm text-gray-500 mt-2">
                Value: {user.creditBalance * creditValue} DZA
              </p>
            </div>

            {/* User Rank System */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="font-medium text-gray-900">User Rank</h3>
                </div>
                <button
                  onClick={() => setShowRankInfo(!showRankInfo)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <HelpCircle className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-purple-600">{userRank.name}</span>
                <span className="text-sm text-green-600 font-medium">{userRank.discount}% Discount</span>
              </div>
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((totalCreditsUsed / 1001) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {totalCreditsUsed} credits used
                </p>
              </div>
            </div>

            {showRankInfo && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-lg">
                <h4 className="font-medium text-gray-900 mb-2">Rank Benefits</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Rank</th>
                      <th className="text-center py-2">Credits Used</th>
                      <th className="text-right py-2">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Basic</td>
                      <td className="text-center">0 - 500</td>
                      <td className="text-right">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Premium</td>
                      <td className="text-center">501 - 750</td>
                      <td className="text-right">10%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">VIP</td>
                      <td className="text-center">751 - 1000</td>
                      <td className="text-right">20%</td>
                    </tr>
                    <tr>
                      <td className="py-2">Enterprise</td>
                      <td className="text-center">1001+</td>
                      <td className="text-right">30%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-2">
                  Ranks are assigned automatically based on your total credit usage.
                  Higher ranks unlock better discounts on all services.
                </p>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Calculator className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-1">Credit Value</p>
                  <p className="text-sm text-gray-600">
                    1 Credit = {creditValue} DZA
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Transaction history */}
          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
            
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-medium">+{transaction.credits} Credits</p>
                    <p className="text-sm text-gray-500">{transaction.amount} DZA</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/profile/transactions">
              <Button
                variant="outline"
                className="mt-6 w-full"
                size="sm"
              >
                View All Transactions
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Purchase credits */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Purchase Credits</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Amount (DZA)
                </label>
                <div className="flex space-x-4">
                  <Input
                    type="number"
                    value={customAmount}
                    onChange={handleAmountChange}
                    placeholder={`Minimum ${minAmount} DZA`}
                    leftIcon={<DollarSign className="h-5 w-5" />}
                    error={customAmount && parseInt(customAmount) < minAmount ? `Minimum amount is ${minAmount} DZA` : ''}
                  />
                  <Button
                    onClick={handleRecharge}
                    disabled={!customAmount || parseInt(customAmount) < minAmount || isLoading}
                    isLoading={isLoading}
                  >
                    Purchase
                  </Button>
                </div>
                {customAmount && parseInt(customAmount) >= minAmount && (
                  <p className="mt-2 text-sm text-gray-600">
                    You will receive {customCredits} credits
                    {userRank.discount > 0 && (
                      <span className="text-green-600">
                        {' '}(with {userRank.discount}% {userRank.name} discount)
                      </span>
                    )}
                  </p>
                )}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">How Credits Work</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Credits are used to pay for various services</li>
                      <li>Each credit is worth {creditValue} DZA</li>
                      <li>Credits never expire</li>
                      <li>Minimum purchase: {minAmount} DZA ({minAmount / creditValue} credits)</li>
                      <li>Your {userRank.name} rank gives you {userRank.discount}% off all purchases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment methods */}
          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>
            
            <div className="mb-6 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-gray-600 mr-4" />
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/25</p>
                </div>
              </div>
              <div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Default
                </span>
              </div>
            </div>
            
            <Button
              variant="outline"
              leftIcon={<Plus className="h-5 w-5" />}
            >
              Add Payment Method
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditBalance;