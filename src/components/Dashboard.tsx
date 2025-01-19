import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Budget, Expense } from '@/types/expense';

interface DashboardProps {
  expenses: Expense[];
  budget: Budget | null;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function Dashboard({ expenses, budget }: DashboardProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryData = useMemo(() => {
    const data: Record<string, number> = {};
    expenses.forEach((expense) => {
      data[expense.category] = (data[expense.category] || 0) + expense.amount;
    });
    return Object.entries(data).map(([name, value]) => ({ 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      value 
    }));
  }, [expenses]);

  const dailyExpenses = useMemo(() => {
    const data: Record<string, number> = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      data[date] = (data[date] || 0) + expense.amount;
    });
    return Object.entries(data)
      .map(([date, amount]) => ({ date, amount }))
      .slice(-7);
  }, [expenses]);

  const budgetProgress = budget ? (totalExpenses / budget.amount) * 100 : 0;
  const isOverBudget = budgetProgress > 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
              </div>
              {budget && (
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Budget</p>
                  <p className="text-3xl font-bold">${budget.amount.toFixed(2)}</p>
                </div>
              )}
            </div>
            {budget && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Budget Progress</p>
                  <p className={`text-sm font-medium ${isOverBudget ? 'text-destructive' : ''}`}>
                    {budgetProgress.toFixed(1)}%
                  </p>
                </div>
                <Progress 
                  value={Math.min(budgetProgress, 100)} 
                  className={`h-2 ${isOverBudget ? 'bg-destructive/20' : ''}`}
                />
                <p className={`mt-2 text-sm ${isOverBudget ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {isOverBudget 
                    ? `Over budget by $${(totalExpenses - budget.amount).toFixed(2)}`
                    : `$${(budget.amount - totalExpenses).toFixed(2)} remaining`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {categoryData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="stroke-background hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                />
                <Legend 
                  formatter={(value) => value} 
                  className="text-xs"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Daily Expenses (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyExpenses} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}