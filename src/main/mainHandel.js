import { ipcMain,BrowserWindow } from 'electron'

var mainWin = BrowserWindow.getFocusedWindow()
console.log('导入了包');


const newWinURL = process.env.NODE_ENV === 'development'
? `http://localhost:9080`
: `file://${__dirname}/index.html`

ipcMain.on('sendclose',(e,d)=>{
    console.log(d); 
    mainWin.close()
})

ipcMain.on('sendmini',(e,d)=>{
    console.log(d);
    mainWin.minimize()
    
})

ipcMain.on('loadHome',(e,d)=>{
    console.log(d);
    mainWin.setSize(1100, 700)
    mainWin.loadURL(newWinURL+'#/home')
    
  })