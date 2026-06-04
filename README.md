# 製造生產規劃報表 (Manufacturing Plan)

生產計劃與物料需求分析系統，用於協助企劃、生管及生產單位進行：

- 生產排程查詢
- 物料需求預估
- 原料缺料分析
- 生產線產能檢視
- 生產趨勢圖表分析
- 生產計畫維護

## 線上展示

🔗 https://druidcub.github.io/manufacturing-plan/

> 如無法開啟，請確認 GitHub Pages 是否已啟用。

## 功能特色

### 生產計畫查詢

- 查詢指定日期生產計畫
- 依產線檢視排程資訊
- 顯示產品與料號資訊

### 物料需求分析

依單位自動分類：

- KG / G
- M
- PC / KPC

快速查看：

- 原料需求量
- 庫存狀況
- 缺料風險

### 圖表分析

- 生產趨勢分析
- 物料消耗趨勢
- 生產預估視覺化

### 權限管理

支援角色權限控管：

- 一般查詢人員
- 企劃編輯人員

## 技術架構

### Frontend

- Vue.js
- Bootstrap
- Chart.js

### Backend API

透過 REST API 取得：

- 生產計畫資料
- 物料資料
- 庫存資料
- 產線資訊

## 專案結構

```text
manufacturing-plan/
│
├── index.html
├── assets/
├── components/
└── .vscode/
