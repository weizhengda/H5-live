require('./index.css')
export default class Answer {
    constructor() {
        this.subjectArr = [
            {
                "title": "中国大陆的国际区号是？",
                "options": [
                    {
                        "option": "+86",
                        "result": "true"
                    },
                    {
                        "option": "+61",
                        "result": "false"
                    },
                    {
                        "option": "+886",
                        "result": "false"
                    }
                ]
            }
        ];
        this.addData();
    }
    // 从服务器获取答题数据
    addData() {
        $.ajax();
    }
    // 移除答题面板
    removeEl() {
        if (this.container) {
            this.container.remove();
        }
    }

}