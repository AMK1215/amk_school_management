<?php

namespace App\Enums;

enum UserType: int
{
    case Admin = 10;
    case Teacher = 20;
    case Student = 30;
    case Parent = 40;
    case Guardian = 50;

    public static function usernameLength(UserType $type): int
    {
        return match ($type) {
            self::Admin => 1,
            self::Teacher => 2,
            self::Student => 3,
            self::Parent => 4,
            self::Guardian => 5,
        };
    }

    public static function childUserType(UserType $type): UserType
    {
        return match ($type) {
            self::Admin => self::Teacher,
            self::Teacher => self::Student,
            self::Student => self::Student,
            self::Parent => self::Parent,
            self::Guardian => self::Guardian,
        };
    }

    public static function canHaveChild(UserType $parent, UserType $child): bool
    {
        return match ($parent) {
            self::Admin => $child === self::Teacher,
            self::Teacher => $child === self::Student,
            self::Student => false, // Students cannot have children
            self::Parent => false, // Parents cannot have children in school system
            self::Guardian => false, // Guardians cannot have children in school system
        };
    }
}
