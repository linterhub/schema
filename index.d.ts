import { JsonSchema as ArgsSchema } from './dist/args.d.ts';
import { JsonSchema as CollectionSchema } from './dist/collection.d.ts';
import { JsonSchema as SchemaverSchema } from './dist/schemaver.d.ts';
import { JsonSchema as PackageSchema } from './dist/package.d.ts';
import { JsonSchema as LinterSchema } from './dist/linter.d.ts';
import { JsonSchema as ImportSchema } from './dist/import.d.ts';
import { JsonSchema as DepsSchema } from './dist/deps.d.ts';
import { JsonSchema as TestSchema } from './dist/test.d.ts';

declare module '@linterhub/schema' {
    interface SchemaCollection {
        collection: CollectionSchema,
        schemaver: SchemaverSchema,
        package: PackageSchema,
        linter: LinterSchema,
        import: ImportSchema,
        deps: DepsSchema,
        args: ArgsSchema,
        test: TestSchema,
    }
    var obj : SchemaCollection;
    export = obj
}
