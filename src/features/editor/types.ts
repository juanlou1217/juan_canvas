/**
 * 活动工具类型定义
 * 定义了编辑器中可用的各种工具类型
 */
export type ActiveTool =
    | "select"          // 选择工具

    | "shapes"          // 形状工具
    | "text"            // 文本工具
    | "images"          // 图像工具
    | "draw"            // 绘制工具
    | "fill"            // 填充工具
    | "stroke-color"    // 描边颜色工具
    | "stroke-width"    // 描边宽度工具
    | "font"            // 字体工具
    | "opacity"         // 透明度工具
    | "filter"          // 滤镜工具
    | "settings"        // 设置工具
    | "ai"              // AI工具
    | "remove-bg"       // 背景移除工具
    | "templates";      // 模板工具
