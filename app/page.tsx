"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Scan,
  Globe,
  Brain,
  Activity,
  UserX,
  Users,
  Usb,
  Cloud,
  CheckCircle,
  Pause,
  Zap,
  AlertTriangle,
  Lock,
  Unlock,
  Settings,
  Eye,
} from "lucide-react"

type MenuSection =
  | "scanner"
  | "firewall"
  | "ai-assistant"
  | "behavior"
  | "utilities"
  | "antispyware"
  | "parental"
  | "usb"
  | "vpn"

interface ScanProgress {
  isScanning: boolean
  progress: number
  threatsFound: number
  currentFile: string
  filesScanned: number
  totalFiles: number
  scanSpeed: number
}

interface ThreatAlert {
  id: string
  name: string
  type: "virus" | "malware" | "trojan" | "adware"
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
}

interface SystemStats {
  cpuUsage: number
  memoryUsage: number
  networkActivity: number
  diskActivity: number
}

export default function CyberAISecurityPro() {
  const [activeSection, setActiveSection] = useState<MenuSection>("scanner")
  const [scanProgress, setScanProgress] = useState<ScanProgress>({
    isScanning: false,
    progress: 0,
    threatsFound: 0,
    currentFile: "",
    filesScanned: 0,
    totalFiles: 0,
    scanSpeed: 0,
  })

  const [threats, setThreats] = useState<ThreatAlert[]>([])
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpuUsage: 15,
    memoryUsage: 45,
    networkActivity: 23,
    diskActivity: 8,
  })

  const [realTimeProtection, setRealTimeProtection] = useState(true)

  // Обновление системной статистики
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        cpuUsage: Math.max(5, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(20, Math.min(80, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        networkActivity: Math.max(0, Math.min(100, prev.networkActivity + (Math.random() - 0.5) * 15)),
        diskActivity: Math.max(0, Math.min(50, prev.diskActivity + (Math.random() - 0.5) * 8)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const menuItems = [
    { id: "scanner" as MenuSection, icon: Scan, label: "Сканер", color: "text-blue-400" },
    { id: "firewall" as MenuSection, icon: Globe, label: "Сеть (Firewall)", color: "text-green-400" },
    { id: "ai-assistant" as MenuSection, icon: Brain, label: "AI-ассистент", color: "text-purple-400" },
    { id: "behavior" as MenuSection, icon: Activity, label: "Поведение", color: "text-yellow-400" },
    { id: "utilities" as MenuSection, icon: CheckCircle, label: "Утилиты", color: "text-cyan-400" },
    { id: "antispyware" as MenuSection, icon: UserX, label: "Антишпион", color: "text-red-400" },
    { id: "parental" as MenuSection, icon: Users, label: "Родительский контроль", color: "text-pink-400" },
    { id: "usb" as MenuSection, icon: Usb, label: "USB и устройства", color: "text-orange-400" },
    { id: "vpn" as MenuSection, icon: Cloud, label: "VPN / Облако", color: "text-indigo-400" },
  ]

  const threatTypes = ["Trojan.Win32.Agent", "Adware.Generic", "Malware.Suspicious", "Virus.Boot.Sector"]
  const filePaths = [
    "C:\\Windows\\System32\\kernel32.dll",
    "C:\\Program Files\\Chrome\\chrome.exe",
    "C:\\Users\\Documents\\suspicious.exe",
    "C:\\Windows\\explorer.exe",
    "C:\\Program Files\\Office\\winword.exe",
    "C:\\Temp\\malware.tmp",
    "C:\\Users\\Downloads\\setup.exe",
    "C:\\Windows\\System32\\drivers\\network.sys",
  ]

  const startAdvancedScan = () => {
    setScanProgress({
      isScanning: true,
      progress: 0,
      threatsFound: 0,
      currentFile: "Инициализация глубокого сканирования...",
      filesScanned: 0,
      totalFiles: 15847,
      scanSpeed: 0,
    })

    let currentProgress = 0
    let filesScanned = 0
    let threatsFound = 0

    const interval = setInterval(() => {
      const increment = Math.random() * 3 + 0.5
      currentProgress += increment
      filesScanned += Math.floor(Math.random() * 50) + 10

      // Случайное обнаружение угроз
      if (Math.random() < 0.1 && threatsFound < 5) {
        threatsFound++
        const newThreat: ThreatAlert = {
          id: Date.now().toString(),
          name: threatTypes[Math.floor(Math.random() * threatTypes.length)],
          type: ["virus", "malware", "trojan", "adware"][Math.floor(Math.random() * 4)] as any,
          severity: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as any,
          timestamp: new Date(),
        }
        setThreats((prev) => [...prev, newThreat])
      }

      if (currentProgress >= 100) {
        currentProgress = 100
        setScanProgress({
          isScanning: false,
          progress: 100,
          threatsFound,
          currentFile: "Сканирование завершено успешно",
          filesScanned: 15847,
          totalFiles: 15847,
          scanSpeed: 0,
        })
        clearInterval(interval)
      } else {
        setScanProgress((prev) => ({
          ...prev,
          progress: currentProgress,
          currentFile: filePaths[Math.floor(Math.random() * filePaths.length)],
          filesScanned,
          scanSpeed: Math.floor(Math.random() * 500) + 100,
        }))
      }
    }, 200)
  }

  const stopScan = () => {
    setScanProgress({
      isScanning: false,
      progress: 0,
      threatsFound: 0,
      currentFile: "",
      filesScanned: 0,
      totalFiles: 0,
      scanSpeed: 0,
    })
  }

  const quarantineThreat = (threatId: string) => {
    setThreats((prev) => prev.filter((t) => t.id !== threatId))
  }

  const renderContent = () => {
    switch (activeSection) {
      case "scanner":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-white flex items-center">
                <Scan className="w-10 h-10 mr-4 text-blue-400" />
                Сканер
              </h1>
              <div className="flex items-center space-x-4">
                <Badge className={`${realTimeProtection ? "bg-green-600" : "bg-red-600"} px-4 py-2`}>
                  {realTimeProtection ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
                  {realTimeProtection ? "Защита активна" : "Защита отключена"}
                </Badge>
              </div>
            </div>

            {/* Главная панель сканирования */}
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
              <CardContent className="p-8 relative z-10">
                {!scanProgress.isScanning && scanProgress.progress === 0 && (
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <Scan className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <Button
                      onClick={startAdvancedScan}
                      className="w-full max-w-md h-16 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      <Zap className="w-6 h-6 mr-3" />
                      Сканировать всё устройство
                    </Button>
                  </div>
                )}

                {scanProgress.isScanning && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="relative w-40 h-40 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-8 border-slate-700" />
                        <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white">{Math.round(scanProgress.progress)}%</div>
                            <div className="text-sm text-blue-400">Сканирование</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-blue-400">
                            {scanProgress.filesScanned.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-400">Файлов проверено</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-400">{scanProgress.scanSpeed}</div>
                          <div className="text-sm text-slate-400">Файлов/сек</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-red-400">{scanProgress.threatsFound}</div>
                          <div className="text-sm text-slate-400">Угроз найдено</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <div className="text-2xl font-bold text-purple-400">
                            {scanProgress.totalFiles.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-400">Всего файлов</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Progress value={scanProgress.progress} className="h-3" />
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Текущий файл:</span>
                        <span className="text-blue-400 font-mono text-xs truncate max-w-md">
                          {scanProgress.currentFile}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={stopScan}
                        variant="outline"
                        className="bg-red-600/20 hover:bg-red-600/30 border-red-600"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Остановить сканирование
                      </Button>
                    </div>
                  </div>
                )}

                {!scanProgress.isScanning && scanProgress.progress === 100 && (
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-400 mb-2">Сканирование завершено!</h3>
                      <p className="text-slate-400">Проверено {scanProgress.filesScanned.toLocaleString()} файлов</p>
                      {scanProgress.threatsFound > 0 && (
                        <p className="text-red-400 font-semibold">Обнаружено угроз: {scanProgress.threatsFound}</p>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        setScanProgress({
                          isScanning: false,
                          progress: 0,
                          threatsFound: 0,
                          currentFile: "",
                          filesScanned: 0,
                          totalFiles: 0,
                          scanSpeed: 0,
                        })
                        setThreats([])
                      }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Новое сканирование
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Панель угроз */}
            {threats.length > 0 && (
              <Card className="bg-red-900/20 border-red-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Обнаруженные угрозы
                  </h3>
                  <div className="space-y-3">
                    {threats.map((threat) => (
                      <div key={threat.id} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              threat.severity === "critical"
                                ? "bg-red-500"
                                : threat.severity === "high"
                                  ? "bg-orange-500"
                                  : threat.severity === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                          />
                          <div>
                            <p className="text-white font-semibold">{threat.name}</p>
                            <p className="text-slate-400 text-sm capitalize">
                              {threat.type} • {threat.severity}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => quarantineThreat(threat.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Поместить в карантин
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-white font-semibold">Обнаружено угроз: {scanProgress.threatsFound}</p>
                      <p className="text-slate-400 text-sm">Система защищена</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-white font-semibold">Последнее сканирование:</p>
                      <p className="text-slate-400 text-sm">1 час назад</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "firewall":
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white flex items-center">
              <Globe className="w-10 h-10 mr-4 text-green-400" />
              Сеть (Firewall)
            </h1>

            <Card className="bg-gradient-to-br from-green-900/20 to-slate-900/80 border-green-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">Брандмауэр активен</p>
                      <p className="text-green-400">Максимальная защита</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white px-4 py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Активен
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Заблокировано атак:</span>
                    <span className="text-white font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Активных подключений:</span>
                    <span className="text-white font-bold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Трафик (входящий):</span>
                    <span className="text-green-400 font-bold">2.3 MB/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Трафик (исходящий):</span>
                    <span className="text-blue-400 font-bold">1.8 MB/s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "ai-assistant":
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white flex items-center">
              <Brain className="w-10 h-10 mr-4 text-purple-400" />
              AI-ассистент
            </h1>

            <Card className="bg-gradient-to-br from-purple-900/20 to-slate-900/80 border-purple-700">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Искусственный интеллект</h3>
                    <p className="text-purple-400">Анализ поведения и обнаружение аномалий</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400">99.7%</div>
                    <div className="text-slate-400 text-sm">Точность обнаружения</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-400">0.02s</div>
                    <div className="text-slate-400 text-sm">Время анализа</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400">24/7</div>
                    <div className="text-slate-400 text-sm">Мониторинг</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white capitalize flex items-center">
              {(() => {
                const currentItem = menuItems.find((item) => item.id === activeSection)
                const IconComponent = currentItem?.icon
                return IconComponent ? <IconComponent className="w-10 h-10 mr-4 text-blue-400" /> : null
              })()}
              {menuItems.find((item) => item.id === activeSection)?.label}
            </h1>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Функция в разработке</h3>
                <p className="text-slate-400">Эта функция будет доступна в следующем обновлении</p>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Shield className="w-12 h-12 text-blue-400" />
              <Eye className="w-6 h-6 text-blue-300 absolute top-3 left-3" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CyberAI Security</h1>
              <p className="text-blue-400 text-sm">AI-powered Protection Suite</p>
            </div>
          </div>
          <Badge className="bg-green-600 text-white px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            Защищено
          </Badge>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-slate-900/50 backdrop-blur-sm border-r border-slate-700 min-h-screen p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
