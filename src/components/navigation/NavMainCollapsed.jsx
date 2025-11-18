/**
 * NavMainCollapsed - Navigation variant for collapsed sidebar
 */
import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useNavigation } from "../../hooks/useNavigation";
import { cn } from "../../utils/cn";

export function NavMainCollapsed({ items, sectionIcon }) {
  const { hasActiveItem, isItemActive } = useNavigation(items);
  const SectionIcon = sectionIcon;
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const itemRefs = useRef([]);

  const focusableItems = useMemo(() => items ?? [], [items]);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    // Return focus to trigger for accessibility
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Move focus to first item when opening
  useEffect(() => {
    if (isOpen && itemRefs.current[0]) {
      itemRefs.current[0].focus();
    }
  }, [isOpen]);

  const onTriggerKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      openMenu();
    }
  };

  const onMenuKeyDown = (e) => {
    const currentIndex = itemRefs.current.findIndex((el) => el === document.activeElement);
    const lastIndex = focusableItems.length - 1;

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % focusableItems.length;
      const nextEl = itemRefs.current[nextIndex];
      nextEl?.focus();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        currentIndex <= 0 ? lastIndex : (currentIndex - 1 + focusableItems.length) % focusableItems.length;
      const prevEl = itemRefs.current[prevIndex];
      prevEl?.focus();
      return;
    }
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            ref={triggerRef}
            isActive={hasActiveItem}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            onClick={toggleMenu}
            onKeyDown={onTriggerKeyDown}
          >
            {SectionIcon && <SectionIcon />}
          </SidebarMenuButton>
          
          {/* Controlled menu with keyboard support */}
          <div
            ref={menuRef}
            className={cn(
              "absolute left-full top-0 ml-2 transition-all duration-200 z-50",
              isOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
            )}
            role="menu"
            aria-label="Section navigation"
            onKeyDown={onMenuKeyDown}
          >
            <div className="rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 shadow-lg p-1 min-w-[12rem]">
              {items.map((item, index) => {
                const Icon = item.icon;
                const active = isItemActive(item.url);
                
                return (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    role="menuitem"
                    tabIndex={-1}
                    ref={(el) => (itemRefs.current[index] = el)}
                    onClick={() => {
                      // Close on activation
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors cursor-pointer",
                      "hover:bg-slate-100 dark:hover:bg-slate-800",
                      "text-slate-950 dark:text-slate-50",
                      active && "bg-slate-100 dark:bg-slate-800"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                    {item.badge}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

