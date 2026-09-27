"use strict";

// 仅做本地表单演示：不发送请求，不使用任何存储保存密码或账号。
document.querySelectorAll("form").forEach((form) => {
  const status = form.querySelector(".status");
  const password = form.querySelector("#password");
  const confirmation = form.querySelector("#confirm-password");
  const passwordFields = form.querySelectorAll("[data-password]");
  const toggleButtons = form.querySelectorAll(".password-toggle");

  function validateFields() {
    if (confirmation) {
      confirmation.setCustomValidity(
        confirmation.value && confirmation.value !== password.value
          ? "两次输入的密码不一致，请重新输入。" : ""
      );
    }
  }

  function handleEdit() {
    status.textContent = "";
    validateFields();
  }

  // 任一密码框编辑或自动填充后，清除旧错误并重新比较。
  form.addEventListener("input", handleEdit);
  form.addEventListener("change", handleEdit);

  function updateToggle(button, input) {
    const visible = input.type === "text";
    const fieldName = input.id === "confirm-password" ? "确认密码" : "密码";
    button.textContent = visible ? "隐藏" : "显示";
    button.setAttribute("aria-label", (visible ? "隐藏" : "显示") + fieldName);
    button.setAttribute("aria-pressed", String(visible));
  }

  toggleButtons.forEach((button) => {
    const input = form.querySelector("#" + button.getAttribute("aria-controls"));
    button.addEventListener("click", () => {
      input.type = input.type === "password" ? "text" : "password";
      updateToggle(button, input);
    });
  });

  form.addEventListener("submit", (event) => {
    // 阻止默认提交，避免数据出现在 URL 中或发送到服务器。
    event.preventDefault();
    validateFields();
    if (!form.reportValidity()) return;

    // 使用固定标记定位：即使密码处于显示状态，也必须清空。
    passwordFields.forEach((input) => {
      input.value = "";
      input.type = "password";
    });
    toggleButtons.forEach((button) => {
      updateToggle(button, form.querySelector("#" + button.getAttribute("aria-controls")));
    });
    validateFields();
    status.textContent = "前端演示成功，未连接服务器。未创建真实账号，也未验证账号身份；密码输入已清空。";
  });
});
