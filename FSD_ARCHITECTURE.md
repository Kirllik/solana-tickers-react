# Feature-Sliced Design (FSD) Architecture

## Структура проекта после декомпозиции

```
src/
├── app/                    # Слой приложения
│   ├── ui/
│   │   └── app.jsx        # Главный компонент приложения
│   └── index.js           # Экспорт App компонента
│
├── pages/                 # Слой страниц
│   ├── liquidity-check/
│   │   ├── ui/
│   │   │   └── liquidity-check-page.jsx
│   │   └── index.js
│   └── index.js
│
├── widgets/               # Слой виджетов (композитные компоненты)
│   ├── header/
│   │   ├── ui/
│   │   │   └── header.jsx
│   │   └── index.js
│   ├── liquidity-item/
│   │   ├── ui/
│   │   │   └── liquidity-item.jsx
│   │   └── index.js
│   ├── liquidity-results/
│   │   ├── ui/
│   │   │   └── liquidity-results.jsx
│   │   └── index.js
│   └── index.js
│
├── features/              # Слой фич (бизнес-логика)
│   ├── file-upload/
│   │   ├── ui/
│   │   │   └── file-upload.jsx
│   │   └── index.js
│   ├── network-selector/
│   │   ├── ui/
│   │   │   └── network-selector.jsx
│   │   └── index.js
│   ├── liquidity-check/
│   │   ├── model/
│   │   │   └── use-liquidity-check.js
│   │   └── index.js
│   └── index.js
│
├── entities/              # Слой сущностей (доменные модели)
│   ├── network/
│   │   ├── model/
│   │   │   └── networks.js
│   │   └── index.js
│   ├── ticker/
│   │   ├── model/
│   │   │   └── ticker.js
│   │   └── index.js
│   └── index.js
│
└── shared/                # Слой общих ресурсов
    ├── ui/                # Переиспользуемые UI компоненты
    │   ├── button/
    │   │   └── index.js
    │   ├── status-message/
    │   │   └── index.js
    │   ├── loading-spinner/
    │   │   └── index.js
    │   └── index.js
    ├── api/               # API клиенты
    │   ├── dex-screener.js
    │   └── index.js
    ├── lib/               # Утилиты и хелперы
    │   ├── utils.js
    │   └── index.js
    └── index.js
```

## Правила импортов FSD

### Иерархия слоев (сверху вниз):
1. **app** - точка входа приложения
2. **pages** - страницы приложения
3. **widgets** - композитные UI блоки
4. **features** - бизнес-функции
5. **entities** - доменные сущности
6. **shared** - общие ресурсы

### Правила импортов:
- Модули могут импортировать только из нижележащих слоев
- Внутри слоя можно импортировать из соседних модулей
- Используются алиасы `@/layer` для удобства

### Примеры корректных импортов:
```javascript
// ✅ Корректно: pages импортирует из widgets, features, entities, shared
import { LiquidityResults } from '@/widgets';
import { NetworkSelector } from '@/features';
import { availableNetworks } from '@/entities';
import { Button } from '@/shared';

// ✅ Корректно: features импортирует из entities и shared
import { createLiquidityResult } from '@/entities';
import { dexScreenerApi } from '@/shared';

// ❌ Некорректно: shared не может импортировать из features
import { NetworkSelector } from '@/features'; // ОШИБКА!
```

## Преимущества FSD архитектуры

1. **Четкое разделение ответственности** - каждый слой имеет свою роль
2. **Масштабируемость** - легко добавлять новые фичи и страницы
3. **Переиспользование** - shared компоненты доступны везде
4. **Тестируемость** - изолированные модули легче тестировать
5. **Командная работа** - разные разработчики могут работать над разными слоями
6. **Рефакторинг** - изменения в одном слое не влияют на другие

## Миграция завершена

Все компоненты успешно декомпозированы согласно принципам Feature-Sliced Design:
- ✅ Удалены старые файлы из `components/`, `hooks/`, `data/`
- ✅ Создана новая структура с правильной иерархией слоев
- ✅ Настроены алиасы импортов в `jsconfig.json`
- ✅ Обновлены все импорты согласно FSD правилам
- ✅ Сохранена вся функциональность приложения
