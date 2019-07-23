When someone wants to use a paprika component that has translatable text (like the `<Collapsible>`), they'd do it like this:

```
import L10n from "@paprika/L10n";
import Collapsible from "@paprika/collapsible";

<h4>Mon app</h4>
<L10n locale="fr">
  <Collapsible />
</L10n>
```

or wrap their entire app with the L10n component:

```
import L10n from "@paprika/L10n";
import Collapsible from "@paprika/collapsible";

<L10n locale="fr">
  ...
  <h4>Mon app</h4>
  <Collapsible />
  ...
</L10n>
```

or if they just want to use English (and the component supports it) they can skip the L10n part:

```
import Collapsible from "@paprika/collapsible";

<React.Fragment>
  ...
  <h4>My app</h4>
  <Collapsible />
  ...
</React.Fragment>
```