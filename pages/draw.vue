<template>
  <div class="container">
    <h1>溢彩画测试</h1>
    
    <!-- 游戏状态信息 -->
    <div class="game-info">
      <div class="moves-counter">剩余点击次数: {{ remainingMoves }}</div>
      <div v-if="gameStatus === 'win'" class="game-message win">恭喜你赢了！</div>
      <div v-if="gameStatus === 'lose'" class="game-message lose">游戏失败，请重试！</div>
    </div>
    
    <!-- 游戏区域 -->
    <div class="game-board">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div 
          v-for="(cell, colIndex) in row" 
          :key="colIndex"
          :class="['cell', cell.color, { 'animating': cell.animating }]"
          @click="paintCell(rowIndex, colIndex)"
        ></div>
      </div>
    </div>
    
    <!-- 画笔选择区域 -->
    <div class="brush-selector">
      <div class="brush-title">选择画笔颜色：</div>
      <div 
        class="brush red" 
        :class="{ active: currentBrush === 'red' }" 
        @click="selectBrush('red')"
      ></div>
      <div 
        class="brush yellow" 
        :class="{ active: currentBrush === 'yellow' }" 
        @click="selectBrush('yellow')"
      ></div>
      <div 
        class="brush blue" 
        :class="{ active: currentBrush === 'blue' }" 
        @click="selectBrush('blue')"
      ></div>
    </div>
    
    <!-- 重置按钮 -->
    <button class="reset-button" @click="resetGame">重置游戏</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 定义颜色
const COLORS = ['red', 'yellow', 'blue']

// 创建6x6网格
const grid = ref([])

// 当前选中的画笔颜色
const currentBrush = ref('red')

// 是否正在动画中
const isAnimating = ref(false)

// 游戏状态：'playing', 'win', 'lose'
const gameStatus = ref('playing')

// 剩余点击次数
const remainingMoves = ref(0)

// 检查游戏是否胜利（所有格子颜色相同）
const checkWin = () => {
  const firstColor = grid.value[0][0].color
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (grid.value[i][j].color !== firstColor) {
        return false
      }
    }
  }
  return true
}

// 获取连通区域（用于模拟）
const getConnectedRegion = (row, col, color, gridData, visited = new Set()) => {
  if (
    row < 0 || 
    row >= 6 || 
    col < 0 || 
    col >= 6 || 
    visited.has(`${row},${col}`) ||
    gridData[row][col].color !== color
  ) {
    return []
  }
  
  visited.add(`${row},${col}`)
  const cells = [{ row, col }]
  
  // 上下左右四个方向
  const directions = [
    { row: -1, col: 0 }, // 上
    { row: 1, col: 0 },  // 下
    { row: 0, col: -1 }, // 左
    { row: 0, col: 1 }   // 右
  ]
  
  for (const dir of directions) {
    const newRow = row + dir.row
    const newCol = col + dir.col
    const adjacentCells = getConnectedRegion(newRow, newCol, color, gridData, visited)
    cells.push(...adjacentCells)
  }
  
  return cells
}

// 模拟游戏是否可以在指定步数内完成
const simulateGame = (gridData, maxMoves) => {
  // 创建网格副本
  const gridCopy = JSON.parse(JSON.stringify(gridData))
  let movesUsed = 0
  
  // 简单策略：每次选择数量最多的颜色区域进行染色
  while (movesUsed < maxMoves) {
    // 检查是否已经获胜
    const firstColor = gridCopy[0][0].color
    let allSameColor = true
    for (let i = 0; i < 6 && allSameColor; i++) {
      for (let j = 0; j < 6 && allSameColor; j++) {
        if (gridCopy[i][j].color !== firstColor) {
          allSameColor = false
        }
      }
    }
    
    if (allSameColor) {
      return true // 游戏可以在指定步数内完成
    }
    
    // 找出最大的连通区域
    let maxRegionSize = 0
    let bestMove = { row: 0, col: 0, color: '' }
    
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const currentColor = gridCopy[i][j].color
        // 对于每种可能的新颜色
        for (const newColor of COLORS) {
          if (newColor !== currentColor) {
            // 获取当前位置的连通区域
            const visited = new Set()
            const region = getConnectedRegion(i, j, currentColor, gridCopy, visited)
            
            if (region.length > maxRegionSize) {
              maxRegionSize = region.length
              bestMove = { row: i, col: j, color: newColor }
            }
          }
        }
      }
    }
    
    // 执行最佳移动
    if (maxRegionSize > 0) {
      const { row, col, color } = bestMove
      const originalColor = gridCopy[row][col].color
      const visited = new Set()
      const region = getConnectedRegion(row, col, originalColor, gridCopy, visited)
      
      // 更新区域颜色
      for (const cell of region) {
        gridCopy[cell.row][cell.col].color = color
      }
      
      movesUsed++
    } else {
      break // 没有可行的移动
    }
  }
  
  // 检查最终状态
  const firstColor = gridCopy[0][0].color
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (gridCopy[i][j].color !== firstColor) {
        return false // 游戏无法在指定步数内完成
      }
    }
  }
  
  return true
}

// 生成随机网格
const generateRandomGrid = () => {
  const newGrid = []
  for (let i = 0; i < 6; i++) {
    const row = []
    for (let j = 0; j < 6; j++) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
      row.push({ color: randomColor, animating: false })
    }
    newGrid.push(row)
  }
  return newGrid
}

// 初始化游戏
const initGame = () => {
  // 重置游戏状态
  gameStatus.value = 'playing'
  
  // 随机生成3-6之间的点击次数
  remainingMoves.value = Math.floor(Math.random() * 4) + 3 // 3到6之间
  
  let isValidGrid = false
  let attempts = 0
  const maxAttempts = 50 // 最大尝试次数
  
  while (!isValidGrid && attempts < maxAttempts) {
    // 生成随机网格
    const newGrid = generateRandomGrid()
    
    // 检查生成的网格是否可以在指定步数内完成
    isValidGrid = simulateGame(newGrid, remainingMoves.value)
    
    if (isValidGrid) {
      grid.value = newGrid
    }
    
    attempts++
  }
  
  // 如果无法生成有效网格，增加点击次数并重试
  if (!isValidGrid) {
    remainingMoves.value = 6 // 使用最大点击次数
    const newGrid = generateRandomGrid()
    grid.value = newGrid
  }
}

// 选择画笔
const selectBrush = (color) => {
  currentBrush.value = color
}

// 获取相邻的同色格子
const getAdjacentCells = (rowIndex, colIndex, color, visited = new Set()) => {
  // 检查边界和是否已访问
  if (
    rowIndex < 0 || 
    rowIndex >= 6 || 
    colIndex < 0 || 
    colIndex >= 6 || 
    visited.has(`${rowIndex},${colIndex}`) ||
    grid.value[rowIndex][colIndex].color !== color
  ) {
    return []
  }
  
  // 标记为已访问
  visited.add(`${rowIndex},${colIndex}`)
  
  // 当前格子
  const cells = [{ row: rowIndex, col: colIndex }]
  
  // 上下左右四个方向
  const directions = [
    { row: -1, col: 0 }, // 上
    { row: 1, col: 0 },  // 下
    { row: 0, col: -1 }, // 左
    { row: 0, col: 1 }   // 右
  ]
  
  // 递归查找相邻同色格子
  for (const dir of directions) {
    const newRow = rowIndex + dir.row
    const newCol = colIndex + dir.col
    const adjacentCells = getAdjacentCells(newRow, newCol, color, visited)
    cells.push(...adjacentCells)
  }
  
  return cells
}

// 计算两个格子之间的曼哈顿距离
const calculateDistance = (cell1, cell2) => {
  return Math.abs(cell1.row - cell2.row) + Math.abs(cell1.col - cell2.col)
}

// 绘制格子
const paintCell = (rowIndex, colIndex) => {
  // 如果游戏已经结束或正在动画中，不响应点击
  if (isAnimating.value || gameStatus.value !== 'playing') return
  
  // 如果点击的格子颜色与当前画笔颜色相同，不做任何操作
  if (grid.value[rowIndex][colIndex].color === currentBrush.value) return
  
  const targetColor = grid.value[rowIndex][colIndex].color
  const cellsToPaint = getAdjacentCells(rowIndex, colIndex, targetColor)
  
  // 如果只有一个格子或没有格子需要染色，直接返回
  if (cellsToPaint.length <= 1) {
    grid.value[rowIndex][colIndex].color = currentBrush.value
    updateGameStatus()
    return
  }
  
  // 减少剩余点击次数
  remainingMoves.value--
  
  // 设置动画状态
  isAnimating.value = true
  
  // 起始格子
  const startCell = { row: rowIndex, col: colIndex }
  
  // 按照与起始格子的距离对格子进行分组
  const cellsByDistance = {}
  let maxDistance = 0
  
  cellsToPaint.forEach(cell => {
    const distance = calculateDistance(startCell, cell)
    if (!cellsByDistance[distance]) {
      cellsByDistance[distance] = []
    }
    cellsByDistance[distance].push(cell)
    maxDistance = Math.max(maxDistance, distance)
  })
  
  // 按照距离依次染色（同一距离的格子同时染色）
  for (let distance = 0; distance <= maxDistance; distance++) {
    if (cellsByDistance[distance]) {
      const cellsAtDistance = cellsByDistance[distance]
      
      setTimeout(() => {
        // 同一距离的格子同时添加动画标记
        cellsAtDistance.forEach(cell => {
          grid.value[cell.row][cell.col].animating = true
        })
        
        // 同一距离的格子同时改变颜色
        setTimeout(() => {
          cellsAtDistance.forEach(cell => {
            grid.value[cell.row][cell.col].color = currentBrush.value
          })
          
          // 同一距离的格子同时移除动画标记
          setTimeout(() => {
            cellsAtDistance.forEach(cell => {
              grid.value[cell.row][cell.col].animating = false
            })
            
            // 最后一组格子动画完成后，重置动画状态并检查游戏状态
            if (distance === maxDistance) {
              isAnimating.value = false
              updateGameStatus()
            }
          }, 300)
        }, 50)
      }, distance * 200) // 每一圈延迟200ms
    }
  }
}

// 更新游戏状态
const updateGameStatus = () => {
  // 检查是否获胜
  if (checkWin()) {
    gameStatus.value = 'win'
    return
  }
  
  // 检查是否失败（没有剩余点击次数）
  if (remainingMoves.value <= 0) {
    gameStatus.value = 'lose'
  }
}

// 重置游戏
const resetGame = () => {
  // 如果正在动画中，不响应点击
  if (isAnimating.value) return
  
  initGame()
}

// 组件挂载时初始化游戏
onMounted(() => {
  initGame()
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.game-info {
  margin: 15px 0;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.moves-counter {
  font-weight: bold;
  margin-bottom: 10px;
}

.game-message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  animation: fadeIn 0.5s;
}

.game-message.win {
  background-color: #4caf50;
  color: white;
}

.game-message.lose {
  background-color: #f44336;
  color: white;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.game-board {
  display: inline-block;
  margin: 20px 0;
  border: 2px solid #333;
}

.row {
  display: flex;
}

.cell {
  width: 50px;
  height: 50px;
  border: 1px solid #333;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.cell.animating {
    z-index: 1;
    position: relative;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    transform: scale(1.05);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.cell:hover {
  opacity: 0.8;
}

.red {
  background-color: #ff5252;
}

.yellow {
  background-color: #ffeb3b;
}

.blue {
  background-color: #2196f3;
}

.brush-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.brush-title {
  margin-right: 10px;
  font-weight: bold;
}

.brush {
  width: 40px;
  height: 40px;
  border: 2px solid #333;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.brush:hover {
  transform: scale(1.1);
}

.brush.active {
  border: 3px solid #000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.reset-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #388e3c;
}
</style>