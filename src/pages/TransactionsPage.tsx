import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Input from '../components/common/Input';

interface Transaction {
  id: string;
  type: string;
  date: string;
  credits: number;
  amount: number;
  description?: string;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch transactions
    const fetchTransactions = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data with various transaction types
      const mockTransactions: Transaction[] = [
        // Credit purchases
        {
          id: '1',
          type: 'Credit Purchase',
          date: 'May 28, 2025',
          credits: 100,
          amount: 1000,
          description: 'Credit balance recharge'
        },
        {
          id: '2',
          type: 'Credit Purchase',
          date: 'May 20, 2025',
          credits: 200,
          amount: 2000,
          description: 'Credit balance recharge'
        },
        // IMEI verifications
        {
          id: '3',
          type: 'IMEI Verification',
          date: 'May 18, 2025',
          credits: -5,
          amount: 50,
          description: 'IMEI check for iPhone 13'
        },
        {
          id: '4',
          type: 'IMEI Verification',
          date: 'May 15, 2025',
          credits: -5,
          amount: 50,
          description: 'IMEI check for Samsung Galaxy S24'
        },
        // Device registrations
        {
          id: '5',
          type: 'Device Registration',
          date: 'May 12, 2025',
          credits: -15,
          amount: 150,
          description: 'New device registration'
        },
        {
          id: '6',
          type: 'Device Registration',
          date: 'May 10, 2025',
          credits: -15,
          amount: 150,
          description: 'New device registration'
        },
        // Ownership transfers
        {
          id: '7',
          type: 'Ownership Transfer',
          date: 'May 8, 2025',
          credits: -10,
          amount: 100,
          description: 'Device ownership transfer'
        },
        {
          id: '8',
          type: 'Ownership Transfer',
          date: 'May 5, 2025',
          credits: -10,
          amount: 100,
          description: 'Device ownership transfer'
        },
        // More credit purchases
        {
          id: '9',
          type: 'Credit Purchase',
          date: 'May 1, 2025',
          credits: 500,
          amount: 5000,
          description: 'Credit balance recharge'
        },
        {
          id: '10',
          type: 'Credit Purchase',
          date: 'April 28, 2025',
          credits: 150,
          amount: 1500,
          description: 'Credit balance recharge'
        }
      ];

      setTransactions(mockTransactions);
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = searchTerm
    ? transactions.filter(transaction =>
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Math.abs(transaction.credits).toString().includes(searchTerm) ||
        transaction.amount.toString().includes(searchTerm) ||
        (transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      )
    : transactions;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">All Transactions</h1>
        <p className="text-gray-600 mt-2">
          View your complete transaction history
        </p>
      </div>

      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5" />}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credits
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.description}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                        transaction.credits > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.credits > 0 ? '+' : ''}{transaction.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {transaction.amount} DZA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'No transactions match your search criteria.' : 'You haven\'t made any transactions yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;