# Annotations rendering RFC

This document tries to present how the a document annotation works, different annotation types and a possible solution to implement a document viewer to cover all the cases.

## Motivation

HTML visualiation of all possible types of annotations, as described in the following sections, is not as straightforward as one can think, mostly because of possible annotations overlaps within the text. While one immediate solution would be overlapping annotation tag elements with `absolute` positioning, this isn't possible because of new lines included in a text block.

Finding a way to cover all those cases could enable advanced visualization and functionalities, e.g., annotation sets comparison.

## Annotation set

An annotation is an object with the following required data fields:

```ts
{
  start: number;
  end: number;
  type: string;
}
```

For example the following is a valid annotation:

```ts
{
  start: 5;
  end: 10;
  type: 'Location';
}
```

Multiple annotations are grouped into an **Annotation Set**.

## Annotations types

### 1. Disjointed annotations

Two annotations are disjointed when their offset are not included in one another or do not overlap.

For example the following are disjointed annotations:

```ts
{
  start: 5;
  end: 10;
  type: 'Location';
},
{
  start: 19;
  end: 22;
  type: 'Person';
}
```

### 2. Nested annotations

Annotations can appear inside other annotations when the offset of an annotation is included in the offset of another one.

For example the following is a nested annotation:

```ts
{
  start: 5;
  end: 10;
  type: 'Location';
},
{
  start: 3;
  end: 7;
  type: 'Location';
}
```

### 3. Annotation with multiple types

An annotation can have multiple types. Different types for the same annotation are identified by different annotations with the same offset, but different types.

For example the following is an annotation with multiple types:

```ts
{
  start: 5;
  end: 10;
  type: 'Location';
},
{
  start: 5;
  end: 10;
  type: 'City';
}
```

### 4. Overlapping annotations

Two or more annotations can overlap with one another when their offset is part of the other

For example the following are overlapping annotations:

```ts
{
  start: 5;
  end: 10;
  type: 'Location';
},
{
  start: 7;
  end: 12;
  type: 'Location';
}
```

## Proposal

As exaplained above an annotation set may include annotations with same and/or overlapping offsets which makes it impossible to render them correctly. Refer to this example: https://codesandbox.io/s/busy-brown-ruv5qu?file=/src/App.tsx.

### Annotation set flattening

Annotation set can be flattened so that annotations do not overlap anymore.
Let's take the following annotation set as an example example:

```ts
{
  start: 0;
  end: 10;
  type: 'Location';
},
{
  start: 2;
  end: 8;
  type: 'Address';
},
{
  start: 5;
  end: 12;
  type: 'Location';
}
{
  start: 5;
  end: 12;
  type: 'City';
},
{
  start: 13;
  end: 15;
  type: 'Person';
}
```

We can `flatten` the above annotation set as follows. For now let's just look at the offsets:

```ts
{
  start: 0;
  end: 2;
},
{
  start: 3;
  end: 5;
},
{
  start: 6;
  end: 8;
}
{
  start: 9;
  end: 10;
},
{
  start: 11;
  end: 12;
}
{
  start: 13;
  end: 15;
}
```

See how there are no more overlaps within the offsets? The idea is to attach to each one of the annotations some metadata to help the rendering function visualize the correct span of text.

The following is still a work in progress. Let's considere the above example again:

```ts
{
  start: 0;
  end: 2;
  props: {
    type: 'Location'
  }
},
{
  start: 3;
  end: 5;
},
{
  start: 6;
  end: 8;
}
{
  start: 9;
  end: 10;
},
{
  start: 11;
  end: 12;
}
{
  start: 13;
  end: 15;
}
```
