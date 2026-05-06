import { expect, test } from "@playwright/test";

test("renders the main restaurant page and sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/AASHIRWAD/);
  await expect(page.getByRole("heading", { name: /本格インド料理/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /ランチ・ディナーの\s*メニュー/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "代表的なメニュー例" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /店名に込めた\s*「恵み」という想い。\s*料理を支える人。/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /料理を支える\s*人たち。/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /よくある\s*質問/ })).toBeVisible();
  await expect(page.getByText("ハラールに配慮したメニューについては")).toBeVisible();
  await expect(page.getByRole("heading", { name: "店舗情報" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Google Maps で開く 石川県金沢市長町1-4-59" })).toBeVisible();
});

test("serves the owner confirmation sheet as a noindex page", async ({ page }) => {
  await page.goto("/owner-confirmation.html");

  await expect(page).toHaveTitle(/店舗情報確認シート/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await expect(page.getByRole("heading", { name: /店舗情報\s*確認シート/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "FAQ 公開文と確認ポイント" })).toBeVisible();
  await expect(page.getByText("ハラール対応")).toBeVisible();
  await expect(page.getByText("確認中").first()).toBeVisible();
});

test("serves linked PDF menus", async ({ request }) => {
  for (const path of ["/lunch-japanese.pdf", "/dinner-japanese.pdf", "/lunch-english.pdf", "/dinner-english.pdf"]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
  }
});

test("mobile navigation opens and links to food section", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile navigation is only collapsed on mobile.");

  await page.goto("/");
  await page.getByRole("button", { name: "メニューを開閉" }).click();

  const foodLink = page.getByRole("link", { name: "料理" });
  await expect(foodLink).toBeVisible();
  await foodLink.click();
  await expect(page).toHaveURL(/#food$/);
  await expect(page.getByRole("heading", { name: /ランチからディナーまで、\s*気軽に本格派を。/ })).toBeVisible();
});

test("switches visible copy between Japanese and English", async ({ page, isMobile }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "EN" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toHaveAttribute("href", "#main-content");
  if (isMobile) {
    await page.getByRole("button", { name: "Open or close menu" }).click();
  }
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Authentic Indian cuisine on Seseragi Street." })).toBeVisible();
  await expect(page.locator('img[src="/cooks/sub_img01.jpg"]')).toHaveAttribute("alt", "AASHIRWAD chefs");
  await expect(page.getByRole("heading", { name: "Visit", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open in Google Maps 1-4-59 Nagamachi, Kanazawa, Ishikawa Open external map" })).toBeVisible();

  await page.getByRole("button", { name: "日本語" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ja");
  await expect(page.getByRole("heading", { name: /本格インド料理/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "店舗情報" })).toBeVisible();
});

test("mobile quick actions expose menu call and map", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile quick actions only appear on mobile.");

  await page.goto("/");
  const quickActions = page.getByRole("navigation", { name: "モバイル固定導線" });
  await expect(quickActions).toBeVisible();
  await expect(quickActions.getByRole("link", { name: "Menu", exact: true })).toBeVisible();
  await expect(quickActions.getByRole("link", { name: "Instagram", exact: true })).toHaveAttribute("href", "https://www.instagram.com/aashirwad.kanazawa/");
  await expect(quickActions.getByRole("link", { name: "Call", exact: true })).toHaveAttribute("href", "tel:0762622170");
  await expect(quickActions.getByRole("link", { name: "Map", exact: true })).toHaveAttribute("href", /google\.com\/maps/);
});

test("desktop floating actions expose menu call and map", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop floating actions are hidden on mobile.");

  await page.goto("/");
  const floatingActions = page.getByRole("navigation", { name: "固定CTA" });
  await expect(floatingActions).toBeVisible();
  await expect(floatingActions.getByRole("link", { name: "Menu", exact: true })).toHaveAttribute("href", "#menu");
  await expect(floatingActions.getByRole("link", { name: "Instagram", exact: true })).toHaveAttribute("href", "https://www.instagram.com/aashirwad.kanazawa/");
  await expect(floatingActions.getByRole("link", { name: "Call", exact: true })).toHaveAttribute("href", "tel:0762622170");
  await expect(floatingActions.getByRole("link", { name: "Map", exact: true })).toHaveAttribute("href", /google\.com\/maps/);
});

test("desktop navigation marks the current section while scrolling", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop navigation is hidden inside the mobile menu.");

  await page.goto("/");
  await page.locator("#menu").scrollIntoViewIfNeeded();
  await expect(page.locator('.site-nav a[aria-current="true"]')).toHaveAttribute("href", "#menu");

  await page.locator("#story").scrollIntoViewIfNeeded();
  await expect(page.locator('.site-nav a[aria-current="true"]')).toHaveAttribute("href", "#story");
});
