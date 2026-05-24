'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Calendar, AlertTriangle, Upload, Zap, TrendingUp,
  Package, Clock, ArrowUpRight, CheckCircle2, ShoppingCart
} from 'lucide-react'
import { toast } from 'sonner'

const events = [
  {
    id: '1', name: 'Eid al-Adha 2026', emoji: '🐑', type: 'eid_adha',
    start: 'May 27', end: 'May 30', daysLeft: 3,
    surge: '2.0×', risk: 'critical', color: 'red',
    skusAtRisk: 3, orderDeadline: 'PASSED',
  },
  {
    id: '2', name: 'White Friday UAE 2026', emoji: '🛍️', type: 'white_friday',
    start: 'Nov 27', end: 'Nov 29', daysLeft: 187,
    surge: '4.0×', risk: 'medium', color: 'amber',
    skusAtRisk: 0, orderDeadline: 'Oct 15, 2026',
  },
  {
    id: '3', name: 'UAE National Day 2026', emoji: '🇦🇪', type: 'national_day',
    start: 'Dec 2', end: 'Dec 3', daysLeft: 192,
    surge: '1.5×', risk: 'low', color: 'green',
    skusAtRisk: 0, orderDeadline: 'Nov 10, 2026',
  },
  {
    id: '4', name: 'Ramadan 2027', emoji: '🌙', type: 'ramadan',
    start: 'Feb 7', end: 'Mar 8', daysLeft: 259,
    surge: '3.5×', risk: 'medium', color: 'blue',
    skusAtRisk: 0, orderDeadline: 'Dec 1, 2026',
  },
]

const skuForecasts = [
  {
    sku: 'FR-0042', name: 'Oud Royal 100ml', category: 'Fragrances',
    currentStock: 240, leadTimeDays: 35,
    eidAdha: { predicted: 580, lower: 460, upper: 700, orderNow: 420, risk: 'critical', orderDate: 'OVERDUE' },
    ramadan: { predicted: 1200, lower: 960, upper: 1440, orderNow: 1050, risk: 'medium', orderDate: 'Dec 1, 2026' },
  },
  {
    sku: 'FR-0078', name: 'Rose Musk 50ml', category: 'Fragrances',
    currentStock: 850, leadTimeDays: 42,
    eidAdha: { predicted: 320, lower: 260, upper: 385, orderNow: 0, risk: 'low', orderDate: 'Covered' },
    ramadan: { predicted: 2100, lower: 1680, upper: 2520, orderNow: 1400, risk: 'medium', orderDate: 'Nov 15, 2026' },
  },
  {
    sku: 'HC-0015', name: 'Bakhoor Classic 250g', category: 'Home Care',
    currentStock: 120, leadTimeDays: 28,
    eidAdha: { predicted: 410, lower: 330, upper: 495, orderNow: 320, risk: 'critical', orderDate: 'OVERDUE' },
    ramadan: { predicted: 890, lower: 710, upper: 1068, orderNow: 800, risk: 'high', orderDate: 'Nov 20, 2026' },
  },
  {
    sku: 'GS-0003', name: 'Luxury Gift Set (5pc)', category: 'Gift Sets',
    currentStock: 45, leadTimeDays: 60,
    eidAdha: { predicted: 180, lower: 140, upper: 220, orderNow: 180, risk: 'critical', orderDate: 'OVERDUE' },
    ramadan: { predicted: 650, lower: 520, upper: 780, orderNow: 620, risk: 'high', orderDate: 'Oct 1, 2026' },
  },
]

const riskBadge: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-green-100 text-green-700 border-green-200',
}

const eventBorder: Record<string, string> = {
  red: 'border-l-red-500',
  amber: 'border-l-amber-400',
  green: 'border-l-green-500',
  blue: 'border-l-blue-500',
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(events[0].id)
  const [generating, setGenerating] = useState(false)

  async function handleGenerateForecast() {
    setGenerating(true)
    toast.loading('AI is analyzing your sales history against GCC event calendar...', { id: 'fc' })
    await new Promise(r => setTimeout(r, 3000))
    toast.success('Forecasts generated!', { id: 'fc' })
    setGenerating(false)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header
        title="Event Surge Planner"
        subtitle="GCC calendar-aware demand forecasting for Ramadan, Eid, DSF, White Friday"
      />

      <div className="flex-1 overflow-hidden flex">
        {/* Left: event list */}
        <div className="w-72 border-r border-slate-200 flex flex-col bg-white shrink-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100 space-y-2">
            <Button
              onClick={handleGenerateForecast}
              disabled={generating}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              {generating ? 'Forecasting...' : 'Run AI Forecast'}
            </Button>
            <Button variant="outline" className="w-full text-sm" size="sm">
              <Upload className="w-4 h-4 mr-2" /> Upload Sales Data
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide px-1">Upcoming Events</p>
            {events.map(event => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event.id)}
                className={`w-full text-left p-3 rounded-lg border-l-4 border border-slate-200 transition-all ${eventBorder[event.color]} ${
                  selectedEvent === event.id ? 'bg-slate-50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{event.emoji} {event.name.replace(' 2026', '').replace(' 2027', '')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{event.start} · {event.daysLeft}d away</span>
                  <span className={`text-[9px] font-semibold border px-1.5 py-0.5 rounded-full ${riskBadge[event.risk]}`}>
                    {event.risk}
                  </span>
                </div>
                {event.skusAtRisk > 0 && (
                  <p className="text-[10px] text-red-600 mt-1">⚠ {event.skusAtRisk} SKUs need action</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: forecast detail */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          {(() => {
            const event = events.find(e => e.id === selectedEvent)!
            return (
              <div className="max-w-4xl mx-auto p-6 space-y-5">

                {/* Event header */}
                <Card className={`border-slate-200 border-l-4 ${eventBorder[event.color]}`}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{event.emoji}</span>
                          <h2 className="text-xl font-bold text-slate-900">{event.name}</h2>
                          <Badge className={`${riskBadge[event.risk]} border text-xs`}>{event.risk} risk</Badge>
                        </div>
                        <p className="text-sm text-slate-500">
                          {event.start} – {event.end} · <strong className={event.daysLeft <= 7 ? 'text-red-600' : 'text-slate-700'}>{event.daysLeft} days away</strong>
                        </p>
                        <div className="flex gap-4 mt-2">
                          <div className="text-xs text-slate-600">
                            <span className="font-semibold text-slate-900">{event.surge}</span> typical surge
                          </div>
                          <div className="text-xs text-slate-600">
                            Order deadline: <span className={`font-semibold ${event.orderDeadline === 'PASSED' ? 'text-red-600' : 'text-slate-900'}`}>{event.orderDeadline}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Generate PO List
                      </Button>
                    </div>

                    {event.daysLeft <= 7 && (
                      <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <strong>Critical:</strong> Order window for {event.name} has passed for long lead-time SKUs. Expedite or plan for stockouts.
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* SKU forecasts */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">SKU-Level Demand Forecast</h3>
                  <div className="space-y-3">
                    {skuForecasts.map(sku => {
                      const fc = sku.eidAdha
                      const coveragePercent = Math.min(100, Math.round((sku.currentStock / fc.predicted) * 100))
                      return (
                        <Card key={sku.sku} className="border-slate-200">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-semibold text-slate-900">{sku.name}</span>
                                  <span className="text-xs text-slate-500">{sku.sku}</span>
                                  <Badge className={`text-[9px] border ${riskBadge[fc.risk]}`}>{fc.risk}</Badge>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">{sku.category} · Lead time: {sku.leadTimeDays} days</p>

                                {/* Coverage bar */}
                                <div className="mb-3">
                                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                    <span>Stock coverage vs forecast</span>
                                    <span className={coveragePercent < 50 ? 'text-red-600 font-semibold' : 'text-slate-600'}>
                                      {coveragePercent}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={coveragePercent}
                                    className={`h-2 ${coveragePercent < 50 ? '[&>div]:bg-red-500' : coveragePercent < 80 ? '[&>div]:bg-amber-400' : '[&>div]:bg-green-500'}`}
                                  />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                  <div className="text-center p-2 bg-slate-50 rounded-lg">
                                    <p className="text-[10px] text-slate-500">Current Stock</p>
                                    <p className="text-sm font-bold text-slate-800">{sku.currentStock}</p>
                                  </div>
                                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                                    <p className="text-[10px] text-slate-500">AI Forecast</p>
                                    <p className="text-sm font-bold text-blue-700">{fc.predicted}</p>
                                    <p className="text-[9px] text-slate-400">{fc.lower}–{fc.upper}</p>
                                  </div>
                                  <div className={`text-center p-2 rounded-lg ${fc.orderNow > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                                    <p className="text-[10px] text-slate-500">Order Now</p>
                                    <p className={`text-sm font-bold ${fc.orderNow > 0 ? 'text-red-700' : 'text-green-700'}`}>
                                      {fc.orderNow > 0 ? fc.orderNow : '✓ Covered'}
                                    </p>
                                    <p className="text-[9px] text-slate-400">{fc.orderDate}</p>
                                  </div>
                                </div>
                              </div>

                              {fc.orderNow > 0 && (
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 text-xs">
                                  <ArrowUpRight className="w-3 h-3 mr-1" />
                                  Create PO
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Surge heatmap */}
                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-700">
                      Ramadan Surge Pattern — Week by Week
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Historical analysis: Category X peaks Week 1, fragrance peaks Week 3-4 (gift-giving)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { week: 'Week 1', fragrances: 85, fmcg: 320, gifting: 45 },
                        { week: 'Week 2', fragrances: 140, fmcg: 280, gifting: 80 },
                        { week: 'Week 3', fragrances: 310, fmcg: 190, gifting: 220 },
                        { week: 'Week 4 (Eid)', fragrances: 380, fmcg: 140, gifting: 450 },
                      ].map(w => (
                        <div key={w.week} className="text-center">
                          <p className="text-[10px] font-semibold text-slate-500 mb-2">{w.week}</p>
                          {[
                            { label: 'Fragrances', value: w.fragrances, max: 380 },
                            { label: 'FMCG', value: w.fmcg, max: 320 },
                            { label: 'Gifting', value: w.gifting, max: 450 },
                          ].map(cat => (
                            <div key={cat.label} className="mb-2">
                              <div className="text-[9px] text-slate-400 mb-0.5">{cat.label}</div>
                              <div
                                className="rounded-sm transition-all"
                                style={{
                                  height: '28px',
                                  background: `hsl(${210 + (cat.value / cat.max) * 30}, ${40 + (cat.value / cat.max) * 50}%, ${70 - (cat.value / cat.max) * 35}%)`,
                                }}
                                title={`${cat.value} units`}
                              />
                              <div className="text-[9px] text-slate-500 mt-0.5">{cat.value}</div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
