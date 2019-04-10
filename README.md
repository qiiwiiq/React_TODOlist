## [React] TODO List [DEMO](https://6wxlmx7oyr.codesandbox.io/)
* 使用 firebase 建立資料庫架構，讀取與寫入資料
* 利用 firebase 排序語法使代辦事項依據重要性與建立事項時間排序
***
### TODO List 具有以下功能
* 建立代辦事項
  - [x] 可輸入標題、完成期限及備忘錄
  - [x] 可標記重要事項，重要事項會被排序在列表最上方
  
* 將待辦事項標記為已完成
  - [x] 完成之事項會從 My task 頁面移到 Completed 頁面
  - [x] 可從 Completed 頁面取消標記完成的事項
  - [x] Completed 頁面之事項依建立時間排序
        
* 刪除代辦事項
  - [x] 刪除之事項將永遠消失，不會被記錄在資料庫上
